<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class messagesController extends Controller
{
    public function index(){
        try{
            $vieweds = Message::where('viewed',1)->get();
            $not_vieweds = Message::where('viewed',0)->get();

            return view('admin.messages.view',compact('vieweds','not_vieweds'));
        }
        catch (\Exception $e){
            return redirect()->route('home')->with('error',$e->getMessage());
        }
    }
    public function updateStatusViewed($id){
        try{
            $message = Message::find($id);
            $message->viewed = 1;
            if ($message->save()) {
                return redirect()->route('messages.view')->with('success', 'Se ha cambiado el status del mensaje con el id: ' . $message->id);
            }
            else{
                return redirect()->route('messages.view')->with('error','No se pudó cambiar el estatus');
            }
        }catch (\Exception $e){
            return redirect()->route('messages.view')->with('error',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            if (Message::destroy($id)) {
                return redirect()->route('messages.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('messages.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('messages.view')->with('error',$e->getMessage());
        }
    }
    public function send(Request $request){
        $lang = app()->getLocale();
        $message="";
        try {
            $request->validate([
                'name' => 'required',
                'phone' => 'required',
                'email' => 'required',
                'message' => 'required'
            ]);
           $message_send = Message::create([
                'name'=>$request->name,
               'email'=>$request->email,
               'phone'=>$request->phone,
               'message'=>$request->message,
               'viewed'=>0
            ]);
           if($message_send) {
               if ($lang==='es') {
                   $message = "Se envió correctamente.";
               }else{
                   $message = "Sent successfully.";
               }
               return redirect()->route('index')->with('success', $message);
           }else{
                   switch ($lang){
                       case 'es':
                           $message = "No se pudó enviar correctamente.";
                       case 'en':
                           $message = "Could not send correctly.";
                   }
                   return redirect()->route('index')->with('success',$message);
               }


        }catch (\Exception $e){
            switch ($lang){
                case 'es':
                    $message ="Hubo un error inesperado";
                case 'en':
                    $message = "There was an unexpected error";
            }
            return  redirect()->route('index')->with('error',$message);
        }
    }

}
