        // server.js

        const express = require('express');
        const bodyParser = require('body-parser');
        const mysql = require('mysql');
        const multer = require('multer');
        const path = require('path');
        const cors = require('cors');
        const csvParser = require('csv-parser');
        const fs = require('fs');
        const csv = require('fast-csv');
        const authRoutes = require('./routes/authRoutes');
        const { Parser } = require('json2csv');


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

        app.use('/auth', authRoutes);

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
        // const storagecsv = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //     cb(null, 'uploadcsv/'); // Destination folder for uploaded files
        //     },
        //     filename: (req, file, cb) => {
        //     //cb(null, file.fieldname + '-' + Date.now() + '.csv');
        //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //     }
        // });
        
        // const uploadcsvf = multer({ 
        //     storagecsv,
        //     // fileFilter: (req, file, cb) => {
        //     //   if (file.mimetype !== 'csv') {
        //     //     return cb(new Error('Only CSV files are allowed'));
        //     //   }
        //     //   cb(null, true);
        //     // }
        //   });

        // app.post('/upload-csv', uploadcsv.single('file'), (req, res) => {
        //     if (!req.file) {
        //         return res.status(400).send('No file uploaded.');
        //       }

        //     const filePath = req.file.path;
        //     const results = [];
          
        //     fs.createReadStream(filePath)
        //       .pipe(csvParser())
        //       .on('data', (data) => results.push(data))
        //       .on('end', () => {
        //         // Process the parsed CSV data, extract relevant columns, and save to the database
        //         results.forEach((row) => {
        //           // Insert row data into the database
        //           db.query('INSERT INTO csvupload (skills, summary, industry, current_location, experience, current_designation, ug_degree, ug_spl, pg_degree, pg_spl, cand_name, func_area, current_company, preferred_location, annual_salary, notice_period, dob, age, marital_status, phone, email, gender, work_permit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [row.skills, row.summary, row.industry, row.current_location, row.experience, row.current_designation, row.ug_degree, row.ug_spl, row.pg_degree, row.pg_spl, row.cand_name, row.func_area, row.current_company, row.preferred_location, row.annual_salary, row.notice_period, row.dob, row.age, row.marital_status, row.phone, row.email, row.gender, row.work_permit], (err, result) => {
        //             if (err) {
        //               console.error('Error inserting data:', err);
        //             }
        //           });
        //         });
          
        //         res.status(200).send('CSV file uploaded and data saved successfully.');
        //       });
        //   });
        // const storagecsv = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, 'csvuploads/'); // Destination folder for uploaded files
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //     }
        //     });

        const storagecsv = multer.diskStorage({
            destination: (req, file, cb) => {
                try {
                    // Specify the destination folder for uploaded files
                    cb(null, 'csvuploads/');
                } catch (error) {
                    // Handle errors
                    cb(error);
                }
            },
            filename: (req, file, cb) => {
                try {
                    // Generate a unique filename for the uploaded file
                    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                } catch (error) {
                    // Handle errors
                    cb(error);
                }
            }
        });



        const uploadcsv = multer({ storage: storagecsv });

       
// Upload CSV file and save data to the database
// app.post('/api/upload-csv', uploadcsv.single('file'), (req, res) => {
//     const { path: filePath, originalname: originalName } = req.file;
  
//     // Read CSV file and save data to the database
//     fs.createReadStream(filePath)
//       .pipe(csvParser())
//       .on('data', (row) => {
//         // Append filename to the row data
//         row.filename = originalName;
  
//         // Insert row data into the database
//         db.query('INSERT INTO csvupload SET ?', row, (error, results, fields) => {
//           if (error) throw error;
//         });
//       })
//       .on('end', () => {
//         // Delete the temporary file after processing
//         fs.unlinkSync(filePath);
//         res.sendStatus(200);
//       });
//   });
app.post('/api/upload-csv', uploadcsv.single('file'), (req, res) => {
    const { path: filePath, originalname: originalName } = req.file;

    try {
        // Read CSV file and save data to the database
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                // Append filename to the row data
                row.filename = originalName;

                // Insert row data into the database
                db.query('INSERT INTO csvupload SET ?', row, (error, results, fields) => {
                    if (error) throw error;
                });
            })
            .on('end', () => {
                // Delete the temporary file after processing
                fs.unlinkSync(filePath);
                res.sendStatus(200);
            });
    } catch (error) {
        // Handle errors, such as file writing errors
        console.error('Error:', error);
        res.status(500).send('Error uploading CSV file');
    }
});
  




        
//CORRECT CODE--------------------------
        // app.post('/upload-csv', uploadcsv.single('file'), (req, res) => {
        //     if (!req.file) {
        //       return res.status(400).send('No file uploaded.');
        //     }
          
        //     const results = [];
        //     fs.createReadStream(req.file.path)
        //       .pipe(csv.parse({ headers: true }))
        //       .on('error', error => console.error(error))
        //       .on('data', row => {
        //         results.push(row);
        //       })
        //       .on('end', () => {
        //         // Insert data into MySQL database
        //         const query = 'INSERT INTO csvupload (id, skills, summary, industry, current_location, experience, current_designation, ug_degree, ug_spl, pg_degree, pg_spl, cand_name, func_area, current_company, preferred_location, annual_salary, notice_period, dob, age, marital_status, phone, email, gender, work_permit) VALUES ?';
        //         db.query(query, [results.map(Object.values)], (error, response) => {
        //           if (error) {
        //             console.error('Error inserting data:', error);
        //             res.status(500).send('Error inserting data into database.');
        //           } else {
        //             res.status(200).send('CSV file uploaded and data saved successfully.');
        //           }
        //         });
        //       });
        //   });





  

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

    // Route to handle CSV form submission
    app.post('/submit-form-csv', upload.single('resume'), (req, res) => {
        const formData = req.body;
        formData.resume = req.file ? req.file.path : null;
    
        // Insert form data into MySQL database
        db.query('INSERT INTO csvupload SET ?', formData, (err, result) => {
        if (err) {
            console.error('Error saving form data: ' + err.message);
            res.status(500).send('Error saving form data');
            return;
        }
    
        res.status(200).send('Form data saved successfully');
        });
    });



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

app.get('/csv-data', (req, res) => {
    // Query the database to fetch all form data
    db.query('SELECT * FROM csvupload', (err, results) => {
        if (err) {
            console.error('Error fetching form data: ' + err.message);
            return res.status(500).send('Error fetching form data');
        }

        // Send the form data as the response
        res.status(200).json(results);
    });
});




// Get list of uploaded CSV files
app.get('/api/csv-files', (req, res) => {
    db.query('SELECT DISTINCT filename, uploaded_at FROM csvupload WHERE filename IS NOT NULL AND filename <> ""', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  // View CSV file
  app.get('/api/view-csv/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'csvuploads', filename);
    res.sendFile(filePath);
  });
  
  // Delete CSV file and its data from the database
  app.delete('/api/delete-csv/:filename', (req, res) => {
    const filename = req.params.filename;
  
    // Delete data associated with the CSV file
    db.query('DELETE FROM csvupload WHERE filename = ?', filename, (error, results, fields) => {
      if (error) throw error;
    });
    res.sendStatus(200);
  });

      // Add a route to download CSV files
      app.get('/download-csv/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'csvuploads', filename);
        res.download(filePath, filename, (err) => {
          if (err) {
            console.error('Error downloading CSV file:', err);
            res.status(500).send('Error downloading CSV file');
          }
        });
      });

      // Endpoint to download CSV file based on filename
app.get('/api/download-csv/:filename', (req, res) => {
    const filename = req.params.filename;

    // Query the database to fetch data based on the filename
    db.query('SELECT * FROM csvupload WHERE filename = ?', filename, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send('Error fetching data');
        }

        if (results.length === 0) {
            return res.status(404).send('No data found for the given filename');
        }

        // Convert data to CSV format
        const fields = Object.keys(results[0]);
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(results);

        // Set response headers for CSV download
        res.header('Content-Type', 'text/csv');
        res.attachment(filename); // Set filename for download

        // Send CSV data as a downloadable file
        res.send(csvData);
    });
});
  

    

        // Start the server
        app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        });
