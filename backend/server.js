// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'talentco_resume',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


//LOGIN Authentication
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

// CRUD Operations

// Create a new resume
app.post('/api/resumes', (req, res) => {
  const { id, candidate_name, email, phone } = req.body;

  db.query(
    'INSERT INTO resumes (id, candidate_name, email, phone) VALUES (?, ?, ?, ?)',
    [id, candidate_name, email, phone],
    (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(results);
        res.status(201).json({ message: 'Resume created successfully' });
      }
    }
  );
});

// Retrieve all resumes
app.get('/api/resumes', (req, res) => {
  db.query('SELECT * FROM resumes', (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.delete("/api/resumes/:id", (req, res) => {
  const sql = 'DELETE FROM resumes WHERE id = ?';
  const id = req.params.id;
  console.log('Deleting resumes with ID (backend):', id);
  db.query(sql, [id], (err, result) => {
    if(err){
      console.error('MySQL error:', err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log('Resume deleted successfully');
      res.status(201).json({ message: 'Resume deleted successfully'});
    }
  });
});


//GET resumes by id
app.get('/api/resumes/:id', (req, res) => {
  const resumeId = req.params.id;
  db.query('SELECT * FROM resumes WHERE id = ?', [resumeId], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//Delete resumes
// app.delete('api/resumes/:id', async (req, res) => {
//   const resumeId = req.params.id;

//   // try {
//   //   // Check if the resume with the given ID exists
//   //   // const [results] = await pool.query('SELECT * FROM resumes WHERE id = ?', [resumeId]);

//   //   // if (results.length === 0) {
//   //   //   return res.status(404).json({ message: 'Resume not found' });
//   //   // }

//   //   // Delete the resume
//   //   await pool.query('DELETE FROM resumes WHERE id = ?', [resumeId]);

//   //   res.status(200).json({ message: 'Resume deleted successfully' });
//   // } catch (error) {
//   //   console.error('Delete error:', error);
//   //   res.status(500).json({ message: 'Internal Server Error' });
//   // }

//   db.query(`DELETE FROM resumes WHERE id = ?`, [resumeId], (err, results) => {
//     if (err) {
//       console.error('MySQL error:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.status(201).json({ message: 'Resume deleted successfully' });
//     }
//   });
// });

//DELETE operation
// app.delete("/api/resumes/:id", (req, res) => {
//     const sql = 'DELETE FROM resumes WHERE id = ?';
//     const id = req.params.id;
//     console.log('Deleting resume with ID (backend):', id);
//     db.query(sql, [id], (err, result) => {
//       if(err) {
//         console.error('MySQL error:', err);
//         res.status(500).send('Internal Server Error');
//       }
//       else {
//         console.log('Resume deleted successfully'); 
//         res.status(201).json({ message: 'Resume deleted successfully' });
//       }
//     })
// })

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})

app.use('/resume', pdfRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
