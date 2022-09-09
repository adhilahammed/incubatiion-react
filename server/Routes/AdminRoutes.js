const { adminlogin, applicationList, viewApp, updateNewAppStat, processingApp, approveNewAppStat, rejectNewAppStat, approvedApp, getBookingSlots, getApplications, slotUpdate, slotDuplicate, allData } = require('../Controllers/AdminControllers');
const { checkAdmin } = require('../Middlewares/AdminMiddlewares');

const router=require('express').Router()

router.post('/',checkAdmin)
router.post('/adminlogin',adminlogin) 

router.get("/adminpanel",applicationList );
router.get("/viewApplication/:id", viewApp);
router.patch("/updateNewAppStatus/:id", updateNewAppStat);
router.patch("/approveNewAppStatus/:id",approveNewAppStat );
router.patch("/rejectNewAppStatus/:id", rejectNewAppStat);
router.get("/approved", approvedApp);

router.get("/processing", processingApp);
router.get("/alldata",allData )
router.get("/getBookingSlots", getBookingSlots);
router.get("/getApplications", getApplications);
router.post("/slotUpdate", slotUpdate);
router.patch("/slotDuplicate", slotDuplicate);


module.exports=router