package com.mabdullah.invoice;

import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;

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

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues contentValues = new ContentValues();
                contentValues.put(MediaStore.Downloads.DISPLAY_NAME, fileName);
                contentValues.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
                contentValues.put(MediaStore.Downloads.IS_PENDING, 1);

                Uri uri = getContext().getContentResolver().insert(
                    MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues
                );

                if (uri == null) {
                    call.reject("Failed to create MediaStore entry");
                    return;
                }

                java.io.OutputStream os = getContext().getContentResolver().openOutputStream(uri);
                if (os == null) {
                    call.reject("Failed to open output stream");
                    return;
                }
                os.write(bytes);
                os.close();

                contentValues.clear();
                contentValues.put(MediaStore.Downloads.IS_PENDING, 0);
                getContext().getContentResolver().update(uri, contentValues, null, null);

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("uri", uri.toString());
                call.resolve(result);
            } else {
                File downloadsDir = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS
                );
                File file = new File(downloadsDir, fileName);
                FileOutputStream fos = new FileOutputStream(file);
                fos.write(bytes);
                fos.close();

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("uri", file.toURI().toString());
                call.resolve(result);
            }
        } catch (Exception e) {
            call.reject("Save failed: " + e.getMessage());
        }
    }
}
