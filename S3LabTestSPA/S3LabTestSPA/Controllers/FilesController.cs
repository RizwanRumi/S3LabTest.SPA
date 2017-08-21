using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace S3LabTestSPA.Controllers
{
    public class FilesController : Controller
    {
        [HttpPost]
        public JsonResult FileUpload()
        {
            string fName = string.Empty;
            string fileName = string.Empty;
            string destinationPath = string.Empty;

            if (Request.Files["selectedFile"] != null)
            {
                HttpPostedFileBase file_Uploader = Request.Files["selectedFile"];

                if (file_Uploader != null)
                {
                    fName = Path.GetFileName(file_Uploader.FileName);
                    var extension = Path.GetExtension(fName);

                    Random _r = new Random();
                    var randomId = _r.Next();

                    string[] selectedFile = fName.Split('.');

                    fileName = selectedFile[0] + "_" + randomId + extension;
                    
                    destinationPath = HttpContext.Server.MapPath("~/UploadFiles/" + fileName);
                    
                    file_Uploader.SaveAs(destinationPath);

                }

            }
            return Json(fileName, JsonRequestBehavior.AllowGet);

        }



        //[HttpPost]

        //public ActionResult RemoveUploadFile(string fileName)
        //{

        //    int sessionFileCount = 0;



        //    try
        //    {

        //        if (Session["fileUploader"] != null)
        //        {

        //            ((List<FileUploadModel>)Session["fileUploader"]).RemoveAll(x => x.FileName == fileName);

        //            sessionFileCount = ((List<FileUploadModel>)Session["fileUploader"]).Count;

        //            if (fileName != null || fileName != string.Empty)
        //            {

        //                FileInfo file = new FileInfo(Server.MapPath("~/MyFiles/" + fileName));

        //                if (file.Exists)
        //                {

        //                    file.Delete();

        //                }

        //            }

        //        }

        //    }

        //    catch (Exception ex)
        //    {

        //        throw ex;

        //    }



        //    return Json(sessionFileCount, JsonRequestBehavior.AllowGet);

        //}











    }

}
