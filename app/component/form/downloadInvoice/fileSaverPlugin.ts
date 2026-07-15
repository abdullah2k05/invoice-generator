import { registerPlugin, type Plugin } from "@capacitor/core";

export interface FileSaverPlugin extends Plugin {
  saveToDownloads(options: {
    data: string;
    fileName: string;
  }): Promise<{ success: boolean; uri?: string }>;
}

export const FileSaver = registerPlugin<FileSaverPlugin>("FileSaver", {
  web: () =>
    import("@capacitor/core").then(() => ({
      saveToDownloads: async () => ({ success: false }),
    })),
});
