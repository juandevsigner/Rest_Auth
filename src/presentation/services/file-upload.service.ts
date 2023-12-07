import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtension: string[] = ["png", "jpg", "jpeg"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtension.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Extension is not valid, valid ones ${validExtension}`
        );
      }
      const destination = path.resolve(__dirname, "../../../", `${folder}`);
      const fileName = `${this.uuid()}.${fileExtension}`;
      this.checkFolder(destination);
      file.mv(`${destination}/${fileName}`);
      return { fileName, destination };
    } catch (error) {
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploads",
    validExtension: string[] = ["png", "jpg", "jpeg"]
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtension))
    );

    return fileNames;
  }
}
