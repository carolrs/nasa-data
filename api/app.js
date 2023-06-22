const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anacarolinarodriguesoares@gmail.com',
    pass: 'topmot-7koGcy-quqsap'
  }
});



// substituir "news-articles" pelo nome real do seu banco de dados
mongoose.connect(process.env.MONGO_URL + "/news-articles", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   cron.schedule('* * * * 7', () => { 
    // const Subscription = mongoose.model('Subscription', new mongoose.Schema({}, { strict: false }), 'subscriptions');
    // Subscription.find({}, (err, docs) => {
    //   if (err) throw err;
      
    //   docs.forEach(async doc => {
    //     const { email, preferences } = doc;
        
    //     const articles = [];
    //     for (let pref of preferences) {
    //       const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${pref}&api-key=${process.env.REACT_APP_NYT_API_KEY}`);
    //       const data = await res.json();
    //       articles.push(...data.response.docs);
    //     }
    //   })
    // })
        
//         const mailOptions = {
//           from: 'anacarolinarodriguesoares@gmail.com',
//           to: email,
//           subject: 'Sua newsletter semanal',
//           text: articles.map(article => article.web_url).join('\n')
//         };
        
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
//       });
//     });
//   });
// });
