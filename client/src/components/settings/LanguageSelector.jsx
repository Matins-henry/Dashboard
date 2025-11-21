import { useState } from 'react';
import { Globe, Check, X } from 'lucide-react';

/**
 * Language Selector Modal
 * Premium language selection with search
 */

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
];

export default function LanguageSelector({ currentLanguage = 'en', onSave, onClose }) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    onSave(selectedLanguage);
    onClose();
  };

  const currentLang = LANGUAGES.find(l => l.code === selectedLanguage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#18181b] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Globe size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Select Language
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Choose your preferred language
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Current Selection */}
        <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-xs text-emerald-400 mb-1">Current Language</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentLang?.flag}</span>
            <div>
              <p className="text-sm font-semibold text-white">{currentLang?.name}</p>
              <p className="text-xs text-zinc-400">{currentLang?.nativeName}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06]
              rounded-xl text-sm text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300
            "
          />
        </div>

        {/* Language List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar mb-6 -mx-2 px-2">
          <div className="space-y-1">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`
                  w-full p-3 rounded-xl transition-all duration-300 flex items-center justify-between
                  ${selectedLanguage === lang.code
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'hover:bg-white/[0.03] border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${selectedLanguage === lang.code ? 'text-white' : 'text-zinc-300'}`}>
                      {lang.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {lang.nativeName}
                    </p>
                  </div>
                </div>
                {selectedLanguage === lang.code && (
                  <Check size={18} className="text-emerald-400" />
                )}
              </button>
            ))}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-zinc-400">No languages found</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05]
              text-zinc-300 border border-white/[0.06] hover:border-white/[0.08]
              rounded-xl font-medium transition-all duration-300
            "
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedLanguage === currentLanguage}
            className={`
              flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300
              flex items-center justify-center gap-2
              ${selectedLanguage === currentLanguage
                ? 'bg-white/[0.03] text-zinc-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              }
            `}
          >
            <Check size={18} />
            Save Language
          </button>
        </div>
      </div>
    </div>
  );
}
