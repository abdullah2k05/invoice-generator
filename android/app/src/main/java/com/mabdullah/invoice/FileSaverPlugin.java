package com.mabdullah.invoice;

import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;

import androidx.core.content.FileProvider;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;

@CapacitorPlugin(name = "FileSaver")
public class FileSaverPlugin extends Plugin {

    @PluginMethod
    public void saveToDownloads(PluginCall call) {
        String base64Data = call.getString("data");
        String fileName = call.getString("fileName", "invoice.pdf");

        if (base64Data == null) {
            call.reject("Missing data parameter");
            return;
        }

        try {
            byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);

            // Strategy 1: MediaStore.Downloads (API 29+, no permissions needed)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                try {
                    ContentValues contentValues = new ContentValues();
                    contentValues.put(MediaStore.Downloads.DISPLAY_NAME, fileName);
                    contentValues.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
                    contentValues.put(MediaStore.Downloads.IS_PENDING, 1);

                    Uri uri = getContext().getContentResolver().insert(
                        MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues
                    );

                    if (uri != null) {
                        java.io.OutputStream os = getContext().getContentResolver().openOutputStream(uri);
                        if (os != null) {
                            os.write(bytes);
                            os.close();

                            contentValues.clear();
                            contentValues.put(MediaStore.Downloads.IS_PENDING, 0);
                            getContext().getContentResolver().update(uri, contentValues, null, null);

                            JSObject result = new JSObject();
                            result.put("success", true);
                            result.put("uri", uri.toString());
                            call.resolve(result);
                            return;
                        }
                    }
                } catch (Exception ignored) {
                    // MediaStore failed, try fallback
                }
            }

            // Strategy 2: Direct Downloads directory (pre-API 29)
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
                File downloadsDir = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS
                );
                if (downloadsDir != null) {
                    File file = new File(downloadsDir, fileName);
                    FileOutputStream fos = new FileOutputStream(file);
                    fos.write(bytes);
                    fos.close();

                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("uri", file.toURI().toString());
                    call.resolve(result);
                    return;
                }
            }

            // Strategy 3: App cache + Share sheet (last resort)
            File cacheDir = getContext().getExternalCacheDir();
            if (cacheDir == null) cacheDir = getContext().getCacheDir();
            File cachedFile = new File(cacheDir, fileName);
            FileOutputStream fos = new FileOutputStream(cachedFile);
            fos.write(bytes);
            fos.close();

            Uri fileUri = FileProvider.getUriForFile(
                getContext(),
                getContext().getPackageName() + ".fileprovider",
                cachedFile
            );

            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.setType("application/pdf");
            shareIntent.putExtra(Intent.EXTRA_STREAM, fileUri);
            shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getContext().startActivity(
                Intent.createChooser(shareIntent, "Save Invoice")
            );

            JSObject result = new JSObject();
            result.put("success", true);
            result.put("shared", true);
            call.resolve(result);

        } catch (Exception e) {
            call.reject("Save failed: " + e.getMessage());
        }
    }
}
