<?php
	class PropertyController extends BaseController {
		public function propertiseList($hash){
			$records = Property::propertiseList($hash);
			return View::make("/property/dmeadmin/propertiseList", array('records' => $records));
		}

		public function propertyEdit($hash){
			$record = Property::propertyDetail($hash);
			$countries = Country::getCountries();
			$propertyTypes = PropertyType::getPropertyTypes();
			$propertySizes = PropertySize::getPropertySizes();
			$certificationStandards = CertificationStandard::getCertificationStandards();
			return View::make("/property/dmeadmin/editProperty", array("record" => $record, "countries" => $countries, "propertyTypes" => $propertyTypes, "propertySizes" => $propertySizes, "certificationStandards" => $certificationStandards));
		}

		public function propertyEditPost($hash){
			$rules = array(
				'property_name' => 'required',
				'property_address' => 'required',
				'property_city' => 'required',
				'property_state' => 'required',
				'property_country_id' => 'required',
				'property_zipcode' => 'required',
				'property_phone' => 'required',
				'property_email' => 'email',
				'property_certification_standard_id' => 'required',
				'property_type_id' => 'required',
				'property_size_id' => 'required'
			  
			);
			$messages = array(
				'property_name.required' => 'Field is required.',
				'property_address.required' => 'Field is required.',
				'property_city.required' => 'Field is required.',
				'property_state.required' => 'Field is required.',
				'property_country_id.required' => ' ',
				'property_zipcode.required' => 'Field is required.',
				'property_phone.required' => 'Field is required.',
				'property_email.email' => 'Not a valid email format.',
				'property_certification_standard_id.required' => ' ',
				'property_type_id.required' => ' ',
				'property_size_id.required' => ' ',
			);   
			$validation = Validator::make(Input::all(), $rules, $messages);
			if($validation->fails()){
				return Redirect::back()->withInput()->withErrors($validation);
			}
			//if validation passes, create company/member

			Property::editProperty(Input::all());
			if(Input::has('save_and_propertise')) {
				return Redirect::to('/admin/members/properties/'.Input::get('company_hash'))->with('account_success','Property information has been updated successfully.');
			}else{
				return Redirect::to('/admin/members/list')->with('account_success','Property information has been updated successfully.');
			}


		}

		/*public function propertyDetail($hash = null){
			$record = Member::memberDetail($hash);
			return View::make("/member/dmeadmin/memberDetail", array("record" => $record));
		}*/
	}