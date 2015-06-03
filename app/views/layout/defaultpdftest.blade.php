<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
		
		<style>
			html, body{margin:0px; padding:0px;}
			.report_detail_bg { float: left;   width: 960px;}
			
			.form_container { float:left;   width: 100%;}
			.form_report_inr {   float: left;  padding: 0;   width: 100%;}
			.form_report_inr p {   float: left;   padding: 0 0 10px;   width: 100%;}
			.form_report_inr p span {   color: #333;   float: left;    font-size: 18px;   font-weight: 500;   width:225px;}
			.form_report_inr p font {   color: #666;   float: left;   font-size: 18px;   font-weight: 500;   width: auto;}
			.photo_gallery_report {   float: left;   padding: 30px 0 0;   width: 100%;}
			.photo_report_a, .photo_report_b {   float: left;   padding: 0 0 20px;   width: 100%;}
			.photo_report_a > h2, .photo_report_b h2, .photo_gallery_queries > h2 {   border-bottom: 1px dashed #ccc;   color: #666;   float: left;   font-size: 20px;   font-weight: 500;   padding: 10px 0;   width: 100%;}
			.photo_report_a > ul, .photo_report_b ul {   float: left;   list-style: none outside none;   margin: 0;   padding: 20px 0 0;   width: 100%;}
			.photo_report_a li, .photo_report_b ul li{    width: auto; margin: 0 10px 0 0;  padding:0 0 10px; float:left;}
			.photo_report_a a, .photo_report_b ul li a {   float: left;   max-width: 100%;   width: 100%;}
			.photo_report_a img, .photo_report_b img {   max-width: 100%;}
			.photo_gallery_queries {   float: left;   padding: 0;   width:100%;}
			.photo_gallery_queries ul {   margin: 20px 0;  list-style: none outside none;  float: left; width: 100%;}
			.photo_gallery_queries p {   float: left;   padding: 0 0 5px;   width: 100%;}
			.photo_gallery_queries label {   color: #333;   float: left;   font-size: 16px;   font-weight: 500;   width: 80px;}
			.photo_gallery_queries span.question {   color: #19b5fe;   float: left;   font-size: 18px;    width: 100%;}
			.photo_gallery_queries span.answer {   color: #333;   float: left;   font-size: 18px;    width: 100%;}
			.photo_gallery_queries li {   float: left;   padding: 0 0 20px;   width: 100%;}
			

.wrapper{float:left; margin:0px; padding:0px; width:100%; background:#000;}
.container{margin:auto; padding:0px; width:960px;}
.left_side{float:left; margin:200px 0 200px; padding:0px; width:500px;}
.left_side h1{font-family:Arial, Helvetica, sans-serif; font-size:30px; line-height:35px; margin:0 0 20px; padding:0px; font-weight:bold; text-decoration: underline;}
.left_side ul{margin:0 0 0 15px; padding:0px; list-style:none;}
.left_side ul li{margin:0px; padding:0px; font-family:Arial, Helvetica, sans-serif; font-size:22px; line-height:30px; }
.box_cnt{width:100%; margin:0 0 20px; float:left; background:#fff;}
.box_cnt img{float:right; margin:0 15px 0 0px; padding:0px;}
.box_table{float:left; margin:0 0 20px; padding:0 0 60px; width:100%;}
.box_table table tr td{font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:normal; }
.box_table table th{font-family:Arial, Helvetica, sans-serif; padding:5px 30px 20px 10px; text-align:left; font-size:20px; line-height:20px; font-weight:bold; color: #fff}
.title_cnt{float:left; margin:15px 0 0; padding:0px; width:100%;}
.hedings{font-weight:bold;}
.title_cnt h1{font-family:Arial, Helvetica, sans-serif; font-size:18px; line-height:20px; font-weight:bold; margin:0 0 25px; padding:0px; text-decoration: underline;}
.box_table table ul{list-style:inside;}.
.images_box_table{float:left; margin:0px; padding:0px;}
.images_box_table ul{margin:0px; padding:0px; list-style:none;}
.images_box{float:left;  margin:0px; padding:0px; width: 100%;}
.images_box ul{ margin: 0; padding: 0}
.images_box ul li{margin:0.5% 1.5% 0 0;list-style: none; float:left; padding:0px; width:30%;}
.images_box img{float:left; margin:0px; padding:0px;}
.big-img_box{float:left; width:640px; margin:0px; padding:0px;}
.right_cnt{float:left; width:280px; margin:0 0 0 25px; padding:0px;}
.right_cnt p{font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:normal; margin:100px 0 0; padding:0px;} 
.after_images_box{float:left; width:850px; margin:0px; padding:0px;}
.after_images_box ul li{margin:0 1.5%; float:left; padding:0px; width:30%;}
.after_images_box p{font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:normal; float:left; width:100%; margin:20px 0 0 20px; padding:0px;}
.samll_big{float:left; width:850px; margin:0px; padding:0px;}
.small_img_cnt{float:left; margin:5px 8px 0 30px; padding:0px; width:299px;}
.big_img_cnt{float:left; margin:0px; padding:0px; width:480px;}
.middium_images_box{float:left; width:700px; margin:0px; padding:0px;}
.middium_images_box ul li{margin:0 5px; float:left; padding:0px;}
.middium_images_box p{font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:normal; float:left; width:100%; margin:20px 0 0 20px; padding:0px;}
.right_cnt2{float:left; width:230px; margin:0 0 0 25px; padding:0px;}
.right_cnt2 p{font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:normal; margin:100px 0 0; padding:0px;} 
.befor_images_box{float:left; margin:0px; padding:0 0 40px; width:100%;}
.after_samll_big{float:left; margin:0px; padding:0px; width:700px;}
.after_big_img_cnt{float:left; margin:0 5px 0 0; padding:0px; width:385px;}
.after_big_img_cnt img{float:left; margin:0px; padding:0px;}
.after_small_img_cnt{float:left; margin:0px; padding:0px; width:300px;}
.after_small_img_cnt img{float:left; margin:0px; padding:0px;}
.befor_images_box img{float:left; margin:0px; padding:0px;}
.befor_images_box li {    float: left;    margin: 0 6px;}
.keeptogether {page-break-inside:avoid;}

		</style>
	</head>

	<body>
		<div class="report_detail_bg">			
			@yield('content')
		</div> <!-- /#content-container -->
	</body>
</html>