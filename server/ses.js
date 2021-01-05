const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables//in case we want to upload it to heroku
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

// region choosed in AWS: region: "eu-west-1"

exports.sendEmail = function (recipient, message, subject) {
    return ses
        .sendEmail({
            Source: "Honey Ginger <honey.ginger@spicedling.email>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("ses.send Email worked"))
        .catch((err) => console.log("error in ses.sendEmail", err));
};
