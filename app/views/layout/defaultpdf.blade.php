<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
		
		<style>
			*{ margin:0; padding:0; font-family: 'Roboto', sans-serif;  color: #444; font-size:14px;}
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
		</style>
	</head>

	<body>
		<div class="report_detail_bg">			
			@yield('content')
		</div> <!-- /#content-container -->
	</body>
</html>