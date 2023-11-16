const Files = require('../models/file.js');


exports.getFiles = async (req,res,next)=>{

    const FolderId = req.folderId;

    const page = parseInt(req.query.page);

    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const totalCount = await File.count({where:{FolderId:FolderId}});
    File.findAll({where:{FolderId:FolderId} , offset:offset, limit:limit})
    .then(results=>{
      res.json({ paginatedFolders: results, count: totalCount });

    })
    .catch(err=>{
        console.log(err);
    })
}