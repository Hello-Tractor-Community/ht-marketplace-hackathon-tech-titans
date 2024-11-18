const User = require('../models/User');
const LoginAudits = require('../models/LoginAudits');
const useragent = require('useragent');
const loginAuditMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message:'Invalid email'  });
        }

        const ipAddress = req.ip;
        const userAgent = req.headers['user-agent'];
        const { family: browser, os: { family: device } } = useragent.parse(userAgent);
        

        const auditLog = new LoginAudits({
            user_id: user._id,
            email,
            ip_address: ipAddress,
            device,
            browser,
            action: 'User Logged In',
        });

        await auditLog.save();

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = loginAuditMiddleware;