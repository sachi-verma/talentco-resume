// resumeRoutes.js
const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const fs = require('fs');

router.get('/download-pdf', async (req, res) => {
  try {
    // Generate HTML content for the resume (replace this with actual HTML content)
    const htmlContent = `<html><body><h1>Candidate Name: John Doe</h1></body></html>`;

    // Create a temporary file to save the HTML content
    const tempHtmlFilePath = 'temp/resume.html';
    fs.writeFileSync(tempHtmlFilePath, htmlContent, 'utf-8');

    // Configuration for html-pdf
    const options = { format: 'Letter' };

    // Generate PDF from HTML
    pdf.create(htmlContent, options).toFile('temp/resume.pdf', (err, result) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Send the generated PDF as a response
      res.sendFile(result.filename, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        }

        // Clean up: remove the temporary HTML and PDF files
        fs.unlinkSync(tempHtmlFilePath);
        fs.unlinkSync(result.filename);
      });
    });
  } catch (error) {
    console.error('Download PDF error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
