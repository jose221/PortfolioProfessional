<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class messageController extends Controller
{
    public function send($lang, Request $request){
        $message="";
        $status = 201;
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
                $subject = "herandro.com.mx: Persona que quiere saber más de ti";
                $for = "angelitho220@gmail.com";
                Mail::send('email',[
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'phone'=>$request->phone,
                    'info'=>$request->message,

                ], function($msj) use($subject,$for){
                    $msj->from("jose.alvarado@herandro.com.mx","Ing.José Ángel Alvarado Gonzalez");
                    $msj->subject($subject);
                    $msj->to($for);
                });
            }else{
                switch ($lang){
                    case 'es':
                        $message = "No se pudó enviar correctamente.";
                    case 'en':
                        $message = "Could not send correctly.";
                }
                $status = 400;
            }


        }catch (\Exception $e){
            switch ($lang){
                case 'es':
                    $message ="Hubo un error inesperado";
                case 'en':
                    $message = $e->getMessage();
            }
            $status = 500;
        }
        return response()->json([
            'status' => $status,
            'message'=> $message
        ]);
    }
}
