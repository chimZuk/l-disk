import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor() {
    this.userLang = navigator.language.indexOf("ru") > -1 ? "ru" : "en";
  }

  userLang: any;

  library: any = {
    en: {
      a: "Albums",
      s: "Shared",
      na: "New Album",
      ma: "My Albums",
      sh: "Shared with Me",
      ep: "Edit Profile",
      eps: "Edit Profile Settings",
      lg: "Log Out",
      eai: "Edit Album Information",
      da: "Delete Album",
      sta: "Share Album",
      an: "Album Name",
      ad: "Album Description",
      ca: "Create Album",
      em: "Email",
      ps: "Password",
      lgin: "Login",
      rgr: "Register",
      tolgin: "To Login",
      torgr: "To Registration",
      nm: "Name",
      enm: "Enter Your Name",
      eem: "Enter Your Email",
      eeps: "Enter Your Password",
      pr: "Profile",
      st: "Setting",
      up: "Upload Photos",
      cf: "Choose File(s)...",
      upp: "Upload"
    },
    ru: {
      a: "Альбомы",
      s: "Общее",
      na: "Новый Албом",
      ma: "Мои Альбомы",
      sh: "Общее",
      ep: "Изменить Профиль",
      eps: "Изменить Настройки",
      lg: "Выйти",
      eai: "Редактировать Альбом",
      da: "Удалить Альбом",
      sta: "Поделиться",
      an: "Название Альбома",
      ad: "Описание Альбома",
      ca: "Создать Альбом",
      em: "Email",
      ps: "Пароль",
      lgin: "Войти",
      rgr: "Зарегистрироваться",
      tolgin: "К Входу",
      torgr: "К Регистрации",
      nm: "Имя",
      enm: "Введите Ваше Имя",
      eem: "Введите Ваш Email",
      eeps: "Введите Ваш Пароль",
      pr: "Профиль",
      st: "Настройки",
      up: "Загрузить Фото",
      cf: "Выберите Файл(ы)...",
      upp: "Загрузить"
    }
  }

  t(req) {
    return this.library[this.userLang][req];
  }
}
