package com.example.darius.application.ClientController;


import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.example.darius.application.Database.DBController;
import com.example.darius.myapplication.R;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class AllClientsFragment extends Fragment {

    private static String[] clients = new String[]{};
    private DBController dbController;
    public AllClientsFragment() {
        // Required empty public constructor
    }
    private boolean isOnline(){
        ConnectivityManager cm=(ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo=cm.getActiveNetworkInfo();
        return netInfo!=null && netInfo.isConnectedOrConnecting();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final View v=inflater.inflate(R.layout.fragment_all_clients, container, false);
        dbController=new DBController();
        SharedPreferences settings= PreferenceManager.getDefaultSharedPreferences(getContext());
        int UserID=settings.getInt("id",0);
        //get clients for doctors
        ArrayList<String> result = dbController.myclients(UserID);
        clients=result.toArray(new String[0]);

        ListAdapter LA=new ArrayAdapter<String>(getContext(),android.R.layout.simple_list_item_1,clients);
        final ListView listView=(ListView) v.findViewById(R.id.clientsList);
        listView.setAdapter(LA);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                try {
                    Toast.makeText(getActivity(), "Here is an Client", Toast.LENGTH_LONG).show();
                }catch(Exception e){
                    Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_LONG).show();
                }
            }
        });
        return v;
    }

}
