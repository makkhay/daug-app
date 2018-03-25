# React Native AWS S3

[![NPM version](http://img.shields.io/npm/v/react-native-s3.svg?style=flat)](https://www.npmjs.com/package/react-native-s3)
[![Build Status](https://travis-ci.org/mybigday/react-native-s3.svg)](https://travis-ci.org/mybigday/react-native-s3)
[![Dependency Status](https://david-dm.org/mybigday/react-native-s3.svg)](https://david-dm.org/mybigday/react-native-s3)
[![devDependency Status](https://david-dm.org/mybigday/react-native-s3/dev-status.svg)](https://david-dm.org/mybigday/react-native-s3#info=devDependencies)

A React Native wrapper for AWS [iOS](https://github.com/aws/aws-sdk-ios)/[Android](https://github.com/aws/aws-sdk-android) S3 SDK.

We currently implements `TransferUtility`, it allow you to upload / download tasks in the background, very suitable for transferring large files, you can freely subscribe / unsubscribe, pause / resume / cancel the task.

See [iOS](http://docs.aws.amazon.com/mobile/sdkforios/developerguide/s3transferutility.html)/[Android](http://docs.aws.amazon.com/mobile/sdkforandroid/developerguide/getting-started-store-retrieve-s3-transferutility.html) docs for more information.

## Known issues

* Currently reload js will lead TransferUtility not work. ([#9](https://github.com/mybigday/react-native-s3/issues/9))

## Installation

```bash
$ npm install react-native-s3 --save
```

## Setup

#### iOS

__*NOTE*__ Only supported iOS ^8.0.

In XCode, in the project navigator:

* Right click `Libraries` ➜ `Add Files to [your project's name]`, Add `node_modules/react-native-s3/ios/RNS3.xcodeproj`.
* Add `libRNS3.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
* Add `$(SRCROOT)/../node_modules/react-native-s3/ios` to `Header Search Paths`, and mark it as `recursive`.
* Add `$(SRCROOT)/../node_modules/react-native-s3/ios/Frameworks` to your project's `Build Settings` ➜ `Framework Search Paths`
* Add `node_modules/react-native-s3/ios/Frameworks/*.framework` to your project's `General` ➜ `Embedded Binaries`
* Edit `AppDelegate.m` of your project

```objective-c
#import "RNS3TransferUtility.h"

......

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler {
  [RNS3TransferUtility interceptApplication:application
        handleEventsForBackgroundURLSession:identifier
                          completionHandler:completionHandler];
}
```

* __*[Optional]*__ you can set the credentials in `AppDelegate.m`

```objective-c
#import "RNS3TransferUtility.h"

......

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[RNS3TransferUtility nativeCredentialsOptions] setObject:@"eu-west-1" forKey:@"region"];
  [[RNS3TransferUtility nativeCredentialsOptions] setObject:[NSNumber numberWithInt:[RNS3TransferUtility credentialType:@"BASIC"]] forKey:@"type"];
  [[RNS3TransferUtility nativeCredentialsOptions] setObject:@"your_access_key_here" forKey:@"access_key"];
  [[RNS3TransferUtility nativeCredentialsOptions] setObject:@"your_secret_key_here" forKey:@"secret_key"];
  ......
}
```

#### Android

* Edit `android/settings.gradle` of your project:

```gradle
...
include ':react-native-s3'
project(':react-native-s3').projectDir = new File(settingsDir, '../node_modules/react-native-s3/android')
```

* Edit `android/app/build.gradle` of your project:

```gradle
...
dependencies {
    ...
    compile project(':react-native-s3')
}
```

* Add package to `MainApplication.java`

```java
......

import com.mybigday.rns3.*;   // import

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    ......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNS3Package(),  // add package
      );
    }
  };

  ......
}
```

You can use [rnpm](https://github.com/rnpm/rnpm) instead of above steps.

* Edit `android/app/src/main/AndroidManifest.xml` of your project:

```xml
<service
  android:name="com.amazonaws.mobileconnectors.s3.transferutility.TransferService"
  android:enabled="true" />
```

* __*[Optional]*__ you can set the credentials in `MainActivity.java`:

```java
import android.os.Bundle;
import com.mybigday.rns3.RNS3TransferUtility;

public class MainActivity extends ReactActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    RNS3TransferUtility.nativeCredentialsOptions.put("region", "eu-west-1");
    RNS3TransferUtility.nativeCredentialsOptions.put("type", RNS3TransferUtility.CredentialType.BASIC);
    RNS3TransferUtility.nativeCredentialsOptions.put("access_key", "your_access_key_here");
    RNS3TransferUtility.nativeCredentialsOptions.put("secret_key", "your_secret_key_here");
  }

  ......
}
```

## The `nativeCredentialsOptions` type

* `BASIC`
* `COGNITO`

## Usage

```js
import { transferUtility } from 'react-native-s3';
```

See [API.md](API.md) for more information.

## Alternatives

- [react-native-aws3](https://github.com/benjreinhart/react-native-aws3) - if you don't need the native library provided background upload/download task features.

## License

[MIT](LICENSE.md)
