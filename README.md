# IRLBR
## Airsoft app companion: make your own IRL Battle Royale game.
![130972619-1f4311ba-e9b2-4a47-b09a-7c1c26ee9211](https://user-images.githubusercontent.com/53794193/196923370-e11071af-5116-4b4a-9a5b-b3f01609bd17.jpg)


### How to use:
1. Install the app - check out **releases** folder.
2. In main menu select `Create new game`, then enter game details
`Round time` - how long each of 3 rounds should be (in minutes);
`Distance` - how longh each side of square game area should be (in meters);
`Start time` - when the game should start;
3. Select location. Press button `⊹` on a map to focus on your position. Click `Create game area` to preview game location.
Long press on a map will change focusing point. After finishing preparation you can proceed to `Start`.
4. When game has been succesfully created, you will see screen with countdown to start time.
Also you will see 6-digit code. Other players can use this code to join the game.
5. If you press `Join` on a main menu and enter 6-digit code, you will join to the active match.
Play fair!

### Techincal details
This app builded with React-native on top of the MapBox SDK.

#### Android
As mentioned in React native docs, use JDK11
```
brew tap homebrew/cask-versions
brew install --cask zulu11
```
To generate android apk file use `cd android && ./gradlew app:assembleRelease`. Then you can find build file on `android/app/build/outputs/apk/app-release.apk.` folder.
