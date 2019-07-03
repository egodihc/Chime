package com.chime;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;


import com.reactnativenavigation.NavigationApplication;
import com.RNFetchBlob.RNFetchBlobPackage; 
import org.pgsqlite.SQLitePluginPackage;
import com.imagepicker.ImagePickerPackage;

public class MainApplication extends NavigationApplication  {


	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
	}

	public List<ReactPackage> getPackages() {
		// Add additional packages you require here
		// No need to add RnnPackage and MainReactPackage
		return Arrays.<ReactPackage>asList(
				new VectorIconsPackage(),
				new ImagePickerPackage(),
				new RNFetchBlobPackage(),
				new SQLitePluginPackage()
		);
	}

	@Override
	public String getJSMainModuleName() {
		return "index";
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}

	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}


}
