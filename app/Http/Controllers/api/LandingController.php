<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
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

class LandingController extends Controller
{
    protected  $usuario_id = 1;
    public function index($lang){
        //$personalData = $this->myPerfil($lang);
        //$studiesData = $this->studies($lang);
        //$myContacts = $this->myContacts($lang);
        //$myKnowledges = $this->myKnowledges($lang);
        $myPortafolio = array(
            'myPerfil'=>$this->myPerfil($lang)->original,
            'studies' => $this->studies($lang)->original,
            'myContacts'=>$this->myContacts($lang)->original,
            'myKnowledges'=>$this->myKnowledges($lang)->original,
            'professional_projects'=>$this->professionalProjects($lang)->original,
            'personal_projects'=>$this->personalProjects($lang)->original,
            'portfolio_categories' => $this->portfolioCategories($lang)->original
        );

        //return $myPortafolio;
        return response()->json($myPortafolio);
    }

    public function myPerfil($lang){
        //'header_text_es','header_text_en', 'slogan_en','slogan_es','logo','avatar'
        $user = User::select('users.*', 'vitae.path as cv_path')
            ->where('users.id',$this->usuario_id)->join('history_curriculum_vitae as vitae','users.cv','=', 'vitae.id' )->first();
        return response()->json(array(
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
        ));
    }
    public function studies($lang){
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
        return response()->json($array_studies);

    }
    public function myContacts($lang){
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
        return response()->json($array_contacts);
    }
    public function myKnowledges($lang){
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
        return response()->json($array_knowledges);
    }
    public function myAbilities($id,$lang){
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
        return response()->json($array_abilities);
    }
    public function personalProjects($lang){
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
        return response()->json($array_projects);
    }
    public function professionalProjects($lang){
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
        return response()->json($array_personal_projects);
    }
    public function portfolioCategories($lang){
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
        return response()->json($array_personal_projects);
    }
}
