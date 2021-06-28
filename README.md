<h1 align="center">
    FlickrAlbumApp
</h1>

# How to Build
## For Android
1. Android Studio 설치
2. ~/.bash_profile에 Android 실행 경로 추가
```
export ANDROID_SDK_ROOT="/Users/username/Library/Android/sdk
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools:$PATH
```
3. 터미널에서 source 설정
```
source .bash_profile
```
4. 작업하고 있는 디렉토리에 들어가서 실행 명령어 입력
```
react-native run-android
```

## For IOS
1. XCode 설치
2. 작업하고 있는 디렉토리의 ios 디렉토리로 디렉토리 변경
```
cd ios
```
3. pod 설치
```
pod install
```
4. 다시 원래 작업 디렉토리로 돌아가서 실행 명령어 입력
```
react-native run-ios
```
