///module export
module.exports = (app, db) => {
  app.post("/request", (req, res) => {
    const blood_group = req.body.blood_group;
    const unit = req.body.unit;

    console.log("bloodgroup : " + blood_group);
    //query
    const sqlSelect = "SELECT * FROM blood_stocks WHERE blood_group=?";

    
    const sqlInsert ="INSERT INTO  user_request(user_id,blood_group,unit) VALUES (1,?,?)";

    //queryy

    
    db.query(sqlSelect, [blood_group], (err, result) => {
      if (err) {
        console.log("**ERROR**" + err);
      } else {
        result = JSON.parse(JSON.stringify(result));
        console.log(result[0].unit);
        if (unit <= result[0].unit) {
          //
          db.query(sqlInsert, [blood_group, unit], (err, result) => {
            if (err) {
              console.log("**ERROR ACCEPTING REQUEST!" + err);
            } else {
              console.log("req send to frnend")
              res.send(
                
                {
                
                message: "REQUEST ACCEPETED COLLECT IT FROM THE BLOOD BANK",
                
              });
            }
          });
        } else {
          res.send({ message: "INSUFFICIENT STOCKS!" });
        }
      }
    });
    
  });
};
