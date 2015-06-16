<?php

class FileController extends BaseController {

	public function getUploadForm() {
		return View::make('image/upload-form');
	}

	public function uploadImage() {
		$file = Input::file('image');
		$input = array('image' => $file);
		$rules = array(
			'image' => 'image'
		);
		$validator = Validator::make($input, $rules);
		if ( $validator->fails() ){
			return Response::json(['success' => false, 'errors' => $validator->getMessageBag()->toArray()]);

		}else {
			$session_id = Session::getId();
			$destinationPath = 'uploads/images/';
			$filename = str_replace(" ","",$file->getClientOriginalName());
			$filename = $session_id."_".time().$filename;
			Input::file('image')->move($destinationPath, $filename);
			
			$file = ImgProxy::link($destinationPath.$filename, 64, 61);
			if(Input::get('image_type') == "company"){
				$file = ImgProxy::link($destinationPath.$filename, 0, 81);
				Session::put('userUploadedCompanyImageThumb', ImgProxy::link($destinationPath.$filename, 0, 81));
				Session::put('userUploadedCompanyImage', $destinationPath.$filename);
			}else if(Input::get('image_type') == "property"){
				$file = ImgProxy::link($destinationPath.$filename, 0, 81);
				Session::put('userUploadedPropertyImageThumb', ImgProxy::link($destinationPath.$filename, 0, 81));
				Session::put('userUploadedPropertyImage', $destinationPath.$filename);
			}else if(Input::get('image_type') == "user"){
				$file = ImgProxy::link($destinationPath.$filename, 64, 61);
				Session::put('userUploadedImageThumb', ImgProxy::link($destinationPath.$filename, 64, 61));
				Session::put('userUploadedImage', $destinationPath.$filename);
			}
			return Response::json(['success' => true, 'file' => $file]);
		}
	}

	public function uploadImageEdit($hash) {
		$file = Input::file('image');
		$input = array('image' => $file);
		$rules = array(
			'image' => 'image'
		);
		$validator = Validator::make($input, $rules);
		if ( $validator->fails() ){
			return Response::json(['success' => false, 'errors' => $validator->getMessageBag()->toArray()]);

		}else{
			$session_id = Session::getId();
			$destinationPath = 'uploads/images/';
			$filename = str_replace(" ","",$file->getClientOriginalName());
			$filename = $session_id."_".time().$filename;
			Input::file('image')->move($destinationPath, $filename);
			$file = "";
			
			if(Input::get('image_type') == "company"){
				$file = ImgProxy::link($destinationPath.$filename, 0, 81);
				//update company table
				DB::table("members")->where("hash", $hash)->update(array("company_logo" => $destinationPath.$filename));
			}else if(Input::get('image_type') == "property"){
				$file = ImgProxy::link($destinationPath.$filename, 0, 81);
				//update company table
				DB::table("properties")->where("hash", $hash)->update(array("property_image" => $destinationPath.$filename));
			}
			return Response::json(['success' => true, 'file' => $file]);
		}
	}
}