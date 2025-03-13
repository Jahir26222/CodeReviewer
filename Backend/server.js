const app =  require('./src/app')
require('dotenv').config()
const PORT = 4003;


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
}) 