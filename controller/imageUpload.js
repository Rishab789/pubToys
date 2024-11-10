const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
        error: "Unsupported file type",
      });
    }

    //file format is supported
    console.log("uploading to myBlogImage");
    const response = await uploadFileToCloudinary(file, "myBlogImages");
    console.log(response);

    // DB ENTRY
    // const fileData = await postModel.create({
    //   title,
    //   body,
    //   imageUrl: response.secure_url,
    //   service,
    //   date,
    // });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
