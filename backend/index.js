        // server.js

        const express = require('express');
        const bodyParser = require('body-parser');
        const mysql = require('mysql');
        const multer = require('multer');
        const path = require('path');
        const cors = require('cors');
        const csvParser = require('csv-parser');
        const fs = require('fs');

        const app = express();
        const port = 3002;

        app.use(cors());

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // MySQL connection
        const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'talentco_resume'
        });

        db.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL as id ' + db.threadId);
        });

        // Multer storage configuration for file uploads
        const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Destination folder for uploaded files
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
        });

        const upload = multer({ storage });


        // Multer storage configuration for CSV file uploads
        const storagecsv = multer.diskStorage({
            destination: (req, file, cb) => {
            cb(null, 'uploadcsv/'); // Destination folder for uploaded files
            },
            filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.csv');
            }
        });
        
        const uploadcsv = multer({ storagecsv });

        app.post('/upload-csv', upload.single('file'), (req, res) => {
            const filePath = req.file.path;
            const results = [];
          
            fs.createReadStream(filePath)
              .pipe(csvParser())
              .on('data', (data) => results.push(data))
              .on('end', () => {
                // Process the parsed CSV data, extract relevant columns, and save to the database
                results.forEach((row) => {
                  // Insert row data into the database
                  db.query('INSERT INTO resume (name, email, phone, address, ctc, notice_period) VALUES (?, ?, ?, ?, ?, ?)', [row.name, row.email, row.phone, row.address, row.ctc, row.notice_period], (err, result) => {
                    if (err) {
                      console.error('Error inserting data:', err);
                    }
                  });
                });
          
                res.status(200).send('CSV file uploaded and data saved successfully.');
              });
          });
          
  

        // // Route to handle form submission
        // app.post('/submit-form', upload.single('resume'), (req, res) => {
        // const formData = req.body;
        // formData.resume_path = req.file ? req.file.path : null;

        // // Insert form data into MySQL database
        // db.query('INSERT INTO forms SET ?', formData, (err, result) => {
        //     if (err) {
        //     console.error('Error saving form data: ' + err.message);
        //     res.status(500).send('Error saving form data');
        //     return;
        //     }

        //     const formId = result.insertId; // Extract the ID of the inserted form

        //     // Check if education data exists in the request
        //     if (req.body.education && req.body.education.length > 0) {
        //     // Map each education entry to include the associated form ID
        //     const educationDataWithFormId = req.body.education.map(education => ({
        //         ...education,
        //         form_id: formId
        //     }));

        //     // Extract the values from the education data
        //     const educationValues = educationDataWithFormId.map(education => [
        //         education.form_id,
        //         education.institute,
        //         education.degree,
        //         education.specialization,
        //         education.start_date,
        //         education.end_date,
        //         education.grade,
        //         education.description
        //     ]);

        //     // Insert education data into MySQL database
        //     db.query('INSERT INTO education (form_id, institute, degree, specialization, start_date, end_date, grade, description) VALUES ?', [educationValues], (err, result) => {
        //         if (err) {
        //         console.error('Error saving education data: ' + err.message);
        //         res.status(500).send('Error saving education data');
        //         return;
        //         }
        //     });
        //     }


        //     res.status(200).send('Form data saved successfully');
        // });
        // });

        // Route to handle form submission
    app.post('/submit-form', upload.single('resume'), (req, res) => {
        const formData = req.body;
        formData.resume_path = req.file ? req.file.path : null;
    
        // Extract education data from formData
        const educationData = formData.education;
        delete formData.education; // Remove education data from formData
    
        // Insert form data into MySQL database
        db.query('INSERT INTO forms SET ?', formData, (err, result) => {
        if (err) {
            console.error('Error saving form data: ' + err.message);
            res.status(500).send('Error saving form data');
            return;
        }
    
        const formId = result.insertId; // Extract the ID of the inserted form
    
        // Insert education data into MySQL database
        if (educationData && educationData.length > 0) {
            // Check if the form_id exists in the forms table
            db.query('SELECT id FROM forms WHERE id = ?', [formId], (err, rows) => {
                if (err) {
                    console.error('Error checking form_id: ' + err.message);
                    res.status(500).send('Error saving education data');
                    return;
                }

                // If form_id exists, insert education data
                if (rows.length > 0) {
                    educationData.forEach(education => {
                        // Append form_id to each education entry
                        education.form_id = formId;
                    });

                const educationValues = educationData.map(education => [
                        formId,
                        education.institute,
                        education.degree,
                        education.specialization,
                        education.start_date,
                        education.end_date,
                        education.grade,
                        education.description
                    ]);
        

                    db.query('INSERT INTO education (form_id, institute, degree, specialization, start_date, end_date, grade, description) VALUES ?', [educationValues], (err, result) => {
                        if (err) {
                            console.error('Error saving education data: ' + err.message);
                            res.status(500).send('Error saving education data');
                            return;
                        }
                    });
                } else {
                    // If form_id doesn't exist, handle the error
                    console.error('Error: form_id does not exist');
                    res.status(500).send('Error saving education data: form_id does not exist');
                    return;
                }
            });
        }
    
        res.status(200).send('Form data saved successfully');
        });
    });

    // app.get('/submit-form', (req, res) => {
    //     db.query('SELECT * FROM forms', (err, results) => {
    //       if (err) {
    //         console.error('MySQL error:', err);
    //         res.status(500).send('Internal Server Error');
    //       } else {
    //         res.json(results);
    //       }
    //     });
    //   });

// Route to fetch form data including resumes
app.get('/form-data', (req, res) => {
    // Query the database to fetch all form data
    db.query('SELECT * FROM forms', (err, results) => {
        if (err) {
            console.error('Error fetching form data: ' + err.message);
            return res.status(500).send('Error fetching form data');
        }

        // Send the form data as the response
        res.status(200).json(results);
    });
});


    

        // Start the server
        app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        });
