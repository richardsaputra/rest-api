const axios = require("axios");

exports.resetAllForumCache = () => {
  axios
    .get(`http://localhost:3200/reset-all-forum-cache`, {
      headers: {
        Authorization:
          "4746723e473acd969aad0943da30aebeaa706d904328ac3795b95bbeefa818af",
      },
    })
    .then((response) => {
      console.log("Sinkronisasi data dengan redis");
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
};
