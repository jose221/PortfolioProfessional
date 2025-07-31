<?php

namespace App\Http\Controllers;

use App\Models\Knowledge;
use App\Models\KnowledgeAbility;
use App\Models\MyContact;
use App\Models\personalProject;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Models\professionalExperience;
use App\Models\Study;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class indexController extends Controller
{
    protected  $usuario_id = 1;
    public function index(){
        if(session()->has('local')){
            $lang = session()->get('locale');
        }
        else{
            $lang = App::getLocale();
        }
        //$personalData = $this->myPerfil($lang);
        //$studiesData = $this->studies($lang);
        //$myContacts = $this->myContacts($lang);
        //$myKnowledges = $this->myKnowledges($lang);
        $myPortafolio = array(
            'myPerfil'=>$this->myPerfil($lang),
            'studies' => $this->studies($lang),
            'myContacts'=>$this->myContacts($lang),
            'myKnowledges'=>$this->myKnowledges($lang),
            'professional_projects'=>$this->professionalProjects($lang),
            'personal_projects'=>$this->personalProjects($lang),
            'portfolio_categories' => $this->portfolioCategories($lang)
        );

        //return $myPortafolio;
        return view('home.content',compact('myPortafolio'));
    }
    protected function setLanguage($lang){
        App::setLocale('es');
        session()->put('locale', $lang);
        return redirect()->back();
    }

    protected function myPerfil($lang){
        //'header_text_es','header_text_en', 'slogan_en','slogan_es','logo','avatar'
        $user = User::select('users.*', 'vitae.path as cv_path')
            ->where('users.id',$this->usuario_id)->join('history_curriculum_vitae as vitae','users.cv','=', 'vitae.id' )->first();
        return array(
            'id'=>1,
            'name'=> $user['name'],
            'age'=>$user['age'],
            'date_birthday'=>$user['date_birthday'],
            'nationality'=>$user['nationality_'.$lang],
            'description'=>$user['description_'.$lang],
            'email'=>$user['email'],
            'country'=>$user['country_'.$lang],
            'header_image_path'=>$user['header_image_path'],
            'my_perfil'=>$user['my_perfil'],
            'avatar'=>$user['avatar'],
            'header_text'=>$user['header_text_'.$lang],
            'slogan'=>$user['slogan_'.$lang],
            'logo'=>$user['logo'],
            'cv' => $user['cv_path']
        );
    }
    protected function studies($lang){
        $array_studies =array();
        $studies = Study::where('user_id',$this->usuario_id)->get()->toArray();
        foreach ($studies as $study){
            array_push($array_studies,array(
                'id'=>$study['id'],
                'caerrer'=>$study['caerrer_'.$lang],
                'school'=>$study['school_'.$lang],
                'folio'=>$study['folio'],
                'user_id'=>$study['user_id']
            ));
        }
        return $array_studies;

    }
    protected function myContacts($lang){
        $array_contacts = array();
        $myContacts = MyContact::where('user_id',$this->usuario_id)->get()->toArray();
        foreach ($myContacts as $contact){
            array_push($array_contacts,array(
                'id'=>$contact['id'],
                'name'=>$contact['name_'.$lang],
                'url_path'=>$contact['url_path'],
                'icon_path'=>$contact['icon_path'],
                'user_id'=>$contact['user_id']
            ));
        }
        return $array_contacts;
    }
    protected function myKnowledges($lang){
        $array_knowledges = array();
        $knowledges = Knowledge::where('user_id',$this->usuario_id)->get()->toArray();
        foreach ($knowledges as $knowledge){
            array_push($array_knowledges,array(
                'id'=>$knowledge['id'],
                'title'=>$knowledge['title_'.$lang],
                'icon_path'=>$knowledge['icon_path'],
                'description'=>$knowledge['description_'.$lang],
                'important'=>$knowledge['important'],
                'user_id'=>$knowledge['user_id'],
                'abilities'=>$this->myAbilities($knowledge['id'],$lang)
            ));
        }
        return $array_knowledges;
    }
    protected function myAbilities($id,$lang){
        $array_abilities = array();
        $abilities = KnowledgeAbility::where('knowledges_id',$id)->get()->toArray();
        foreach ($abilities as $ability){
            array_push($array_abilities,array(
                'id'=>$ability['id'],
                'title'=>$ability['title_'.$lang],
                'description'=>$ability['description_'.$lang],
                'knowledge_id'=>$ability['knowledges_id']
            ));

        }
        return $array_abilities;
    }
    protected function personalProjects($lang){
        $array_projects = array();
        $projects = personalProject::where('user_id',$this->usuario_id)->get()->toArray();
        foreach ($projects as $project){
            array_push($array_projects,array(
                'id'=>$project['id'],
                'image_path'=>$project['image_path'],
                'name'=>$project['name_'.$lang],
                'date_upload'=>$project['date_upload'],
                'description'=>$project['description_'.$lang],
                'link'=>$project['link'],
                'user_id'=>$project['user_id']
            ));
        }
        return $array_projects;
    }
    protected function professionalProjects($lang){
        $array_personal_projects = array();
        $experiences = professionalExperience::where('user_id',$this->usuario_id)->get()->toArray();
        foreach ($experiences as $experience){
            array_push($array_personal_projects,array(
                'id'=>$experience['id'],
                'image_path'=>$experience['image_path'],
                'company'=>$experience['company'],
                'job'=>$experience['job_'.$lang],
                'date_start'=>$experience['date_start'],
                'date_end'=>$experience['date_end'],
                'portfolio' => $experience['portfolio'],
                'description'=>$experience['description_'.$lang],
                'country'=>$experience['country_'.$lang],
                'user_id'=>$experience['user_id']
            ));
        }
        return $array_personal_projects;
    }
    protected function portfolioCategories($lang){
        $array_personal_projects = array();
        $experiences = PortfolioCategory::all()->toArray();
        foreach ($experiences as $experience) {
            $portfolios = Portfolio::where('portfolio_categories_id', $experience['id'])->get()->toArray();
            $port = [];
            foreach ($portfolios as $portfolio){
                array_push($port, [
                    'id' => $portfolio['id'],
                    'code' => $portfolio['code'],
                    'icon_path' => $portfolio['icon_path'],
                    'title' => $portfolio['title_'.$lang],
                    'description' => $portfolio['description_'.$lang],
                    'years_experience'=> $portfolio['years_experience'],
                    'knowledge_level'=> $portfolio['knowledge_level'],
                ]);
            }
            array_push($array_personal_projects, array(
                'id'=>$experience['id'],
                'code'=> $experience['code'],
                'title'=> $experience['title_'.$lang],
                'description'=> $experience['title_'.$lang],
                'portfolios'=>$port
            ));
        }
        return $array_personal_projects;
    }


}
