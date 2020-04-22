<?php
echo ' 
        <div>
            <nav class="navbar-wrap-conteiner" style="height: 100%;"> <!--   navbar-toggle-->
                <div class="navbar-nav-wrap accordion" id="accordionExample">
                    <div class="nav-header">
                        <span>ЛИЧНЫЙ КАБИНЕТ</span>
                        <span>ЛК</span>
                    </div>                    
                    <ul class="navbar-nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link " href="'.$host.'/statusLaunch">
                                <span>
                                    <svg class="squre-18" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
                                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                    </svg>
                                </span>
                                <span class="ml-3 nav-link-text">Статусы запусков</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="'.$host.'/documents">
                                <span><svg class="squre-18" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
                                <span class="ml-3 nav-link-text">Документы</span>
                            </a>
                        </li>
                    </ul>
                    <div class="dropdown-divider"></div>
                    <div class="nav-header">
                        <span>ПРИСТУПАЯ К РАБОТЕ</span>
                        <span>ПР</span>
                    </div>
                    <ul class="navbar-nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span><svg class="squre-18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3,7V5H5V4C5,2.89 5.9,2 7,2H13V9L15.5,7.5L18,9V2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M7,11H5V13H7V11M7,7V5H5V7H7M7,19V17H5V19H7Z"/></svg></span>
                                <span class="ml-3 nav-link-text">Документация</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span><svg class="squre-18" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>
                                <span class="ml-3 nav-link-text">Cписок изменений</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span><svg class="squre-18" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></span>
                                <span class="ml-3 nav-link-text">Поддержка</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>        
';
?>
