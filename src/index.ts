import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path');
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360')
        .on('end', () => {
            console.log('Processing finished successfully');
            res.status(200).send('Processing finished successfully');
        })
        .on('error', (err: any) => {
            console.log(`An error occured - ${err.message}`);
            res.status(500).send(`An error occured - ${err.message}`);
        })
        .save(outputFilePath);
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}` )
});