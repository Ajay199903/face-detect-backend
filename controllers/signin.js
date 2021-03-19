const handleSingIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('email','hash').from('login')
        .where({email: email})    
        .then(loginInfo => {
            if(loginInfo.length)
            {
                const valid = bcrypt.compareSync(password, loginInfo[0].hash);
                if(valid) {
                    db.select('*').from('users')
                        .where({email: email})
                        .then(user => {
                            res.json(user[0])
                        }).catch(err => res.status(400).json('Unable to find user'));
                }
                else
                {
                    res.status(400).json('Wrong Credentials');
                }
            }
            else
                res.status(400).json('Wrong Credentials');
        }).catch(err => res.status(400).json('Wrong Credentials'));
};

export default { handleSingIn };