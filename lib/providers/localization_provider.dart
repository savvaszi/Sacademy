import 'package:flutter/material.dart';

class LocalizationProvider extends ChangeNotifier {
  Localizations _localizations = Localizations(languageCode: 'en');

  Localizations get localizations => _localizations;

  void toggleLanguage() {
    _localizations = Localizations(
      languageCode: _localizations.languageCode == 'en' ? 'el' : 'en',
    );
    notifyListeners();
  }
}

class Localizations {
  final String languageCode;

  Localizations({required this.languageCode});

  bool get isEnglish => languageCode == 'en';
  bool get isGreek => languageCode == 'el';
}
