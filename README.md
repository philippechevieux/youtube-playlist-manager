<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- 
*** PROJECT SHIELDS
*** Template for Github Stats : https://github.com/Naereen/badges
-->
<div align="center">

[![GitHub contributors](https://img.shields.io/github/contributors/philippechevieux/youtube-playlist-manager?style=for-the-badge)](https://github.com/philippechevieux/youtube-playlist-manager/)
[![GitHub forks](https://img.shields.io/github/forks/philippechevieux/youtube-playlist-manager?style=for-the-badge)](https://github.com/philippechevieux/youtube-playlist-manager/)
[![GitHub stars](https://img.shields.io/github/stars/philippechevieux/youtube-playlist-manager?style=for-the-badge)](https://github.com/philippechevieux/youtube-playlist-manager/)
[![GitHub issues](https://img.shields.io/github/issues/philippechevieux/youtube-playlist-manager?style=for-the-badge)](https://github.com/philippechevieux/youtube-playlist-manager/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/philippe-chevieux-287829141/)
   
</div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
   <img src="https://github.com/philippechevieux/youtube-playlist-manager/blob/master/public/logo192.png" alt="Logo" width="100" height="100">

  <h3 align="center">Youtube Playlist Manager</h3>

  <p align="center">
    A great tool to manage your playlists
    <br />
    <br />
    <a href="https://youtubeplaylistmanager.philintel.com/">View Demo</a>
    ·
    <a href="https://github.com/philippechevieux/youtube-playlist-manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/philippechevieux/youtube-playlist-manager/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#api-used">API Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
   <img src="https://github.com/philippechevieux/youtube-playlist-manager/blob/master/public/screenshots/1.1.0/bottom-player.png" alt="Logo" width="900" height="453">
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- 
*** Template for badges : https://github.com/Ileriayo/markdown-badges
-->

### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

### API Used

|  | Name | Description | Library |
|---|---|---|---|
|![Google Identity API](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white)| [Google Identity Services SDK](https://developers.google.com/identity/gsi/web/guides/overview) | Used for authentification | [react-oauth](https://github.com/MomenSherif/react-oauth)
|![YouTube Data API](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)| [YouTube Data API](https://developers.google.com/youtube/v3/getting-started) | Used to retrieve playlists and their contents| No library used |
|![YouTube API iFrame](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)| [YouTube API iFrame](https://developers.google.com/youtube/iframe_api_reference) | Used to play videos in playlists| [react-youtube](https://github.com/tjallingt/react-youtube) |


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* yarn
  ```sh
  npm install yarn -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/philippechevieux/youtube-playlist-manager.git
   ```
2. Install requiered packages
   ```sh
   yarn install
   ```
3. Create a project in the [Google Developpers Console](https://developers.google.com/youtube/v3/getting-started#:~:text=Google%20Developers%20Console)
4. Get your [authorization credentials](https://developers.google.com/youtube/registering_an_application) so the application can submit API requests
5. _(Optional) Read Youtube Data API [documentation](https://developers.google.com/youtube/v3/getting-started)_
6. Create an environnement file `.env`
7. Enter your API in `.env`
   ```js
   REACT_APP_GOOGLE_CLIENT_ID = MY_KEY.apps.googleusercontent.com;
   ```
8. Start the application
   ```sh
   yarn start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the appropriate tag.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Branch from `develop` (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
