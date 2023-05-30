const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getUserLandingPage = (req, res) => {
  res.send([
    {
      id: 1,
      name: "Leane Grande",
      username: "Bret",
    },
    {
      id: 2,
      name: "Ervin Smith",
      username: "Ant",
    },
    {
      id: 3,
      name: "Clemenson Smith",
      username: "Guu",
    },
  ]);
};
const getStudentInfo = (req, res) => {
  console.log(req.body);
  res.send("successfull");
};

const saveFile = (req, res) => {
  console.log(req.res);
  let imago = req.body.myImage;
  // res.send("succesfully uploaded", imago);

  const resImage = cloudinary.uploader.upload(imago, { public_id: "monkey" }
  );

  resImage
    .then((data) => {
      console.log(data);
      console.log(data.secure_url);
      let cloudLink = data.secure_url;
      res.send({message:"successfully uploaded",cloudLink})
    })
    .catch((err) => {
      console.log(err);
    });
};

const getNodeMailer = (req, res) => {
  res.send({message:"successful", status:true})
  let transporter = nodemailer.createTransporter({
    service : 'gmail',
    auth : {
        user : Process.env.USER,
        pass: Process.env.PASS
    }
  })

  let mailOptions = {
    from : 'badmusadejunior@gmail.com',
    to : ['aremuelija@gmail.com', 'oluwafemijohn1000@gmail.com'],
    subject : 'Nodemailer check, Do you read me? over!',
    text : 'Hope this meets you well?',
    html : "<p>Thi is what happens when use nodemailer</p>",
    attachment : [
      {
        filename : "monkey",
        path : "https://res.cloudinary.com/adesave/image/upload/v1684838985/monkey.jpg"
      }
    ]
  }

  transporter.sendMail(mailOptions)
  .then((response)=> {
    console.log(response);
  })
  .catch((error)=> {
    console.log(error);
  })
  
}
module.exports = { getUserLandingPage, getStudentInfo, saveFile, getNodeMailer };
