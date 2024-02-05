const mongoose=require('mongoose')

const trendingSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  const Trendingmodel = mongoose.model('Trending', trendingSchema);

  module.exports={Trendingmodel}