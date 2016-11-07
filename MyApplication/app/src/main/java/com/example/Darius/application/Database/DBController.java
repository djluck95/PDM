package com.example.Darius.application.Database;
import android.os.StrictMode;
import com.example.Darius.application.Model.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import cz.msebera.android.httpclient.client.HttpClient;
import cz.msebera.android.httpclient.client.methods.HttpPost;
import cz.msebera.android.httpclient.impl.client.BasicResponseHandler;
import cz.msebera.android.httpclient.impl.client.DefaultHttpClient;

public class DBController{
    private StrictMode.ThreadPolicy policy;
    private HttpClient httpclient;
    private String ip = "192.168.15.103";
    public DBController(){
        this.policy=new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(this.policy);
        this.httpclient=new DefaultHttpClient();
    }
    public User login_user(final String username, final String password){
        String url = "http://"+ip+":3000/Login";
        HttpPost request=new HttpPost(url+"?username="+username+"&password="+password);
        BasicResponseHandler handler = new BasicResponseHandler();
        String result = "";
        try {
            result = httpclient.execute(request, handler);
            JSONObject toJson=new JSONObject(result);
            JSONArray user=toJson.getJSONArray("data");
                return new User(user.getJSONObject(0).getInt("ID"),
                            user.getJSONObject(0).getString("FirstName"),
                            user.getJSONObject(0).getString("LastName"),
                            user.getJSONObject(0).getString("Username"),
                            user.getJSONObject(0).getString("Password")
                );
        } catch (Exception e) {
            // TODO Auto-generated catch block
            return null;
        }
    }
    public int register_user(final String firstname,final String lastname,final String username, final String password){
        String url = "http://"+ip+":3000/Register";
        HttpPost request=new HttpPost(url+"?firstname="+firstname+"&lastname="+lastname+"&username="+username+"&password="+password);
        BasicResponseHandler handler = new BasicResponseHandler();
        String result = "";
        try {
            result = httpclient.execute(request, handler);
            JSONObject toJson=new JSONObject(result);
            return toJson.getInt("valid");
        } catch (Exception e) {
            //for request error
            return -1;
        }
    }
    public int add_client(String firstname, String lastname, String email, int age, String phone, String country, int userid){
        String url = "http://"+ip+":3000/Addclient";
        HttpPost request=new HttpPost(url+"?firstname="+firstname+
                                        "&lastname="+lastname+
                                        "&email="+email+
                                        "&age="+age+
                                        "&phone="+phone+
                                        "&country="+country+
                                        "&userid="+userid);
        BasicResponseHandler handler = new BasicResponseHandler();
        String result = "";
        try {
            result = httpclient.execute(request, handler);
            JSONObject toJson=new JSONObject(result);
            return toJson.getInt("valid");
        } catch (Exception e) {
            //for request error
            return -1;
        }
    }
    public ArrayList<String> myClients(int userId){
        String url = "http://"+ip+":3000/Myclients";
        HttpPost request=new HttpPost(url+"?userId="+userId);
        BasicResponseHandler handler = new BasicResponseHandler();
        ArrayList<String> clientsList = new ArrayList<String>();
        String[] myClients=new String[]{};
        String result="";
        try {
            result = httpclient.execute(request, handler);
            JSONArray jsonarray = new JSONArray(result);
            for (int i = 0; i < jsonarray.length(); i++) {
                JSONObject jsonobject = jsonarray.getJSONObject(i);
                String firstname=jsonobject.getString("FirstName");
                String lastname=jsonobject.getString("LastName");
                clientsList.add(firstname+" "+lastname);
            }
            return clientsList;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }
}