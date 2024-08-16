const hashPassword = (req, res, next) => {
    const {password} = req.body;
    const hash = bcrypt.hashSync(password, 8);
    console.log(hash);
}


module.exports =