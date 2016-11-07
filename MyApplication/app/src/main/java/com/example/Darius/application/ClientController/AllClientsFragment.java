package com.example.Darius.application.ClientController;


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
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

import com.example.Darius.application.Database.DBController;
import com.example.Darius.myapplication.R;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class AllClientsFragment extends Fragment {

    private static String[] CLIENTS = new String[]{"ALA","BALA","CACA"};
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
        ArrayList<String> result = dbController.myClients(UserID);
        CLIENTS =result.toArray(new String[0]);
        ListAdapter LA=new ArrayAdapter<String>(getContext(),android.R.layout.simple_list_item_1, CLIENTS);
        ListView listView=(ListView) v.findViewById(R.id.clientsList);
        listView.setAdapter(LA);
        return v;
    }

}
