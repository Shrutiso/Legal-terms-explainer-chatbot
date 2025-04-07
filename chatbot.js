document.getElementById('searchBtn').addEventListener('click', searchTerm);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('languageSelect').addEventListener('change', updateLanguage);

function searchTerm() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const language = document.getElementById('languageSelect').value;
    const termsList = document.getElementById('termsList');
    termsList.innerHTML = '';

    if (termsData[input]) {
        const term = document.createElement('div');
        term.classList.add('term-card');
        term.innerHTML = `<strong>${input.toUpperCase()}</strong>: ${termsData[input][language]}`;
        termsList.appendChild(term);
    } else {
        termsList.innerHTML = `<p style="color:red;">Term not found. Try asking legalBot !!</p>`;
    }
}

function toggleTheme() {
    const body = document.body;
    body.dataset.theme = body.dataset.theme === "light" ? "dark" : "light";
}

function updateLanguage() {
    searchTerm();
}

function askLegalBot(input, language, termsList) {
    const apiKey = "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";

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a legal assistant that explains terms simply." },
                { role: "user", content: `Explain the legal term "${input}" in simple ${language === 'hi' ? 'Hindi' : 'English'}.` }
            ],
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        const botReply = document.createElement('div');
        botReply.classList.add('term-card');
        botReply.innerHTML = `<strong>LegalBot says</strong>: ${data.choices[0].message.content}`;
        termsList.appendChild(botReply);
    })
    .catch(error => {
        console.error("OpenAI API Error:", error);
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = `<p style="color:red;">LegalBot failed to respond.</p>`;
        termsList.appendChild(errorMsg);
    });
}














































const termsData = {
    "contract": { en: "A legally binding agreement.", hi: "एक कानूनी बाध्यकारी समझौता।" },
    "bail": { en: "Temporary release from custody.", hi: "अस्थायी रूप से हिरासत से रिहाई।" },
    "witness": { en: "A person who sees an event happen.", hi: "एक व्यक्ति जो किसी घटना को देखता है।" },
    "plaintiff": { en: "A person who brings a case to court.", hi: "जो व्यक्ति अदालत में मामला लाता है।" },
    "defendant": { en: "A person accused in a case.", hi: "जिस व्यक्ति पर मामला दर्ज है।" },
    "lawsuit": { en: "A legal case brought to court.", hi: "अदालत में लाया गया एक कानूनी मामला।" },
    "testimony": { en: "A formal statement given in court.", hi: "अदालत में दिया गया औपचारिक बयान।" },
    "appeal": { en: "A request to a higher court for review.", hi: "उच्च न्यायालय में पुनरावलोकन के लिए अनुरोध।" },
    "arbitration": { en: "Settlement of a dispute outside court.", hi: "अदालत के बाहर विवाद का निपटान।" },
    "jurisdiction": { en: "The official power to make legal decisions.", hi: "कानूनी निर्णय लेने की आधिकारिक शक्ति।" },
    "affidavit": { en: "A written sworn statement.", hi: "एक लिखित शपथ पत्र।" },
    "allegation": { en: "A claim of wrongdoing.", hi: "गलत कार्य का दावा।" },
    "amendment": { en: "A change in a legal document.", hi: "कानूनी दस्तावेज़ में परिवर्तन।" },
    "deposition": { en: "A witness's sworn out-of-court testimony.", hi: "गवाह की शपथबद्ध अदालत के बाहर गवाही।" },
    "acquittal": { en: "Legal judgment that someone is not guilty.", hi: "कानूनी निर्णय कि कोई व्यक्ति दोषी नहीं है।" },
    "conviction": { en: "Formal declaration of guilt.", hi: "दोषी ठहराने की औपचारिक घोषणा।" },
    "hearing": { en: "A legal proceeding before a judge.", hi: "न्यायाधीश के समक्ष कानूनी कार्यवाही।" },
    "injunction": { en: "A court order to stop an action.", hi: "किसी कार्य को रोकने के लिए अदालत का आदेश।" },
    "litigation": { en: "The process of taking legal action.", hi: "कानूनी कार्रवाई करने की प्रक्रिया।" },
    "subpoena": { en: "A court order requiring testimony or evidence.", hi: "गवाही या साक्ष्य की मांग करने वाला अदालत का आदेश।" },
    "verdict": { en: "The decision of a jury or judge.", hi: "जूरी या न्यायाधीश का निर्णय।" },
    "prosecution": { en: "Legal proceedings against someone.", hi: "किसी के खिलाफ कानूनी कार्यवाही।" },
    "probation": { en: "A period of supervision instead of jail.", hi: "जेल के बजाय निगरानी की अवधि।" },
    "perjury": { en: "Lying under oath.", hi: "शपथ के तहत झूठ बोलना।" },
    "sublet": { en: "To rent property to another person.", hi: "किसी अन्य व्यक्ति को संपत्ति किराए पर देना।" },
    "statute": { en: "A written law.", hi: "एक लिखित कानून।" },
    "negligence": { en: "Failure to take proper care.", hi: "उचित देखभाल करने में विफलता।" },
    "probate": { en: "The process of legally validating a will.", hi: "वसीयत को कानूनी रूप से मान्य करने की प्रक्रिया।" },
    "estate": { en: "A person's property and assets.", hi: "किसी व्यक्ति की संपत्ति और परिसंपत्तियां।" },
    "trust": { en: "A legal arrangement for managing assets.", hi: "संपत्तियों के प्रबंधन के लिए कानूनी व्यवस्था।" },
    "tort": { en: "A civil wrongdoing.", hi: "एक नागरिक गलत कार्य।" },
    "embezzlement": { en: "Stealing money entrusted to you.", hi: "आपके भरोसे रखे गए पैसे की चोरी।" },
    "felony": { en: "A serious crime.", hi: "एक गंभीर अपराध।" },
    "misdemeanor": { en: "A minor crime.", hi: "एक मामूली अपराध।" },
    "extradition": { en: "Sending a criminal to another country.", hi: "अपराधी को दूसरे देश भेजना।" },
    "decree": { en: "An official court order.", hi: "एक आधिकारिक अदालत का आदेश।" },
    "restitution": { en: "Compensation for loss or damage.", hi: "हानि या क्षति के लिए मुआवजा।" },
    "defamation": { en: "Damaging someone's reputation.", hi: "किसी की प्रतिष्ठा को नुकसान पहुंचाना।" },
    "liability": { en: "Legal responsibility.", hi: "कानूनी ज़िम्मेदारी।" },
    "forgery": { en: "Falsifying documents or signatures.", hi: "दस्तावेज़ या हस्ताक्षरों को गलत तरीके से बनाना।" },
    "kidnapping": { en: "Illegally taking a person by force.", hi: "बलपूर्वक किसी व्यक्ति का अवैध अपहरण।" },
    "fraud": { en: "Deception for personal gain.", hi: "व्यक्तिगत लाभ के लिए धोखाधड़ी।" },
    "assault": { en: "Physical attack or threat.", hi: "शारीरिक हमला या धमकी।" },
    "homicide": { en: "The killing of one person by another.", hi: "एक व्यक्ति द्वारा दूसरे व्यक्ति की हत्या।" },
    "manslaughter": { en: "Unintentional killing.", hi: "अनजाने में की गई हत्या।" },
    "theft": { en: "Stealing property.", hi: "संपत्ति की चोरी।" },
    "robbery": { en: "Stealing with violence or threat.", hi: "हिंसा या धमकी के साथ चोरी।" },
    "burglary": { en: "Illegal entry with intent to commit a crime.", hi: "अपराध करने की मंशा से अवैध प्रवेश।" },
    "domestic violence": { en: "Abuse within a household.", hi: "एक परिवार के भीतर दुर्व्यवहार।" },
    "mediation": { en: "A neutral party helps resolve a dispute.", hi: "एक तटस्थ पक्ष विवाद को हल करने में मदद करता है।" },
    "plea": { en: "A defendant's response to charges.", hi: "आरोपों पर प्रतिवादी की प्रतिक्रिया।" },
    "oath": { en: "A formal promise to tell the truth.", hi: "सच बोलने का औपचारिक वादा।" },
    "guardian": { en: "A person legally responsible for another.", hi: "एक व्यक्ति जो कानूनी रूप से दूसरे के लिए जिम्मेदार है।" },
    "injunction": { en: "A court order to do or stop something.", hi: "किसी कार्य को करने या रोकने के लिए अदालत का आदेश।" },
    "litigation": { en: "The process of taking legal action.", hi: "कानूनी कार्रवाई करने की प्रक्रिया।" },
    "subpoena": { en: "A court order requiring testimony or evidence.", hi: "गवाही या साक्ष्य की मांग करने वाला अदालत का आदेश।" },
    "verdict": { en: "The decision of a jury or judge.", hi: "जूरी या न्यायाधीश का निर्णय।" },
    "prosecution": { en: "Legal proceedings against someone.", hi: "किसी के खिलाफ कानूनी कार्यवाही।" },
    "probation": { en: "A period of supervision instead of jail.", hi: "जेल के बजाय निगरानी की अवधि।" },
    "perjury": { en: "Lying under oath.", hi: "शपथ के तहत झूठ बोलना।" },
    "sublet": { en: "To rent property to another person.", hi: "किसी अन्य व्यक्ति को संपत्ति किराए पर देना।" },
    "statute": { en: "A written law.", hi: "एक लिखित कानून।" },
    "negligence": { en: "Failure to take proper care.", hi: "उचित देखभाल करने में विफलता।" },
    "probate": { en: "The process of legally validating a will.", hi: "वसीयत को कानूनी रूप से मान्य करने की प्रक्रिया।" },
    "estate": { en: "A person's property and assets.", hi: "किसी व्यक्ति की संपत्ति और परिसंपत्तियां।" },
    "trust": { en: "A legal arrangement for managing assets.", hi: "संपत्तियों के प्रबंधन के लिए कानूनी व्यवस्था।" },
    "tort": { en: "A civil wrongdoing.", hi: "एक नागरिक गलत कार्य।" },
    "embezzlement": { en: "Stealing money entrusted to you.", hi: "आपके भरोसे रखे गए पैसे की चोरी।" },
    "felony": { en: "A serious crime.", hi: "एक गंभीर अपराध।" },
    "misdemeanor": { en: "A minor crime.", hi: "एक मामूली अपराध।" },
    "extradition": { en: "Sending a criminal to another country.", hi: "अपराधी को दूसरे देश भेजना।" },
    "decree": { en: "An official court order.", hi: "एक आधिकारिक अदालत का आदेश।" },
    "restitution": { en: "Compensation for loss or damage.", hi: "हानि या क्षति के लिए मुआवजा।" },
    "defamation": { en: "Damaging someone's reputation.", hi: "किसी की प्रतिष्ठा को नुकसान पहुंचाना।" },
    "liability": { en: "Legal responsibility.", hi: "कानूनी ज़िम्मेदारी।" },
    "forgery": { en: "Falsifying documents or signatures.", hi: "दस्तावेज़ या हस्ताक्षरों को गलत तरीके से बनाना।" },
    "kidnapping": { en: "Illegally taking a person by force.", hi: "बलपूर्वक किसी व्यक्ति का अवैध अपहरण।" },
    "fraud": { en: "Deception for personal gain.", hi: "व्यक्तिगत लाभ के लिए धोखाधड़ी।" },
    "assault": { en: "Physical attack or threat.", hi: "शारीरिक हमला या धमकी।" },
    "homicide": { en: "The killing of one person by another.", hi: "एक व्यक्ति द्वारा दूसरे व्यक्ति की हत्या।" },
    "manslaughter": { en: "Unintentional killing.", hi: "अनजाने में की गई हत्या।" },
    "theft": { en: "Stealing property.", hi: "संपत्ति की चोरी।" },
    "robbery": { en: "Stealing with violence or threat.", hi: "हिंसा या धमकी के साथ चोरी।" },
    "burglary": { en: "Illegal entry with intent to commit a crime.", hi: "अपराध करने की मंशा से अवैध प्रवेश।" },
    "domestic violence": { en: "Abuse within a household.", hi: "एक परिवार के भीतर दुर्व्यवहार।" },
    "plea": { en: "A defendant's response to charges.", hi: "आरोपों पर प्रतिवादी की प्रतिक्रिया।" },
    "oath": { en: "A formal promise to tell the truth.", hi: "सच बोलने का औपचारिक वादा।" },
    "guardian": { en: "A person legally responsible for another.", hi: "एक व्यक्ति जो कानूनी रूप से दूसरे के लिए जिम्मेदार है।" },
    "adjournment": { en: "A suspension or postponement of court proceedings.", hi: "अदालती कार्यवाही का स्थगन या विलंब।" },
     "brief": { en: "A written statement submitted in a trial.", hi: "मुकदमे में प्रस्तुत एक लिखित बयान।" },
"contempt": { en: "Disrespect or disobedience to the court.", hi: "अदालत का अपमान या अवज्ञा।" },
"docket": { en: "A list of cases in court for hearing.", hi: "सुनवाई के लिए अदालत में मामलों की सूची।" },
"evidence": { en: "Information presented to prove or disprove something.", hi: "कुछ साबित या खारिज करने के लिए प्रस्तुत जानकारी।" },
"foreclosure": { en: "Taking property due to non-payment of debt.", hi: "ऋण न चुकाने पर संपत्ति को जब्त करना।" },
"garnishment": { en: "Court-ordered withholding of wages to pay a debt.", hi: "ऋण चुकाने के लिए वेतन की अदालत द्वारा की गई कटौती।" },
"hearsay": { en: "Information received from others, not from direct knowledge.", hi: "दूसरों से प्राप्त जानकारी, प्रत्यक्ष ज्ञान नहीं।" },
"indictment": { en: "A formal charge or accusation of a serious crime.", hi: "गंभीर अपराध का औपचारिक आरोप।" },
"juror": { en: "A member of a jury.", hi: "जूरी का एक सदस्य।" },
"lease": { en: "A contract for renting property.", hi: "संपत्ति किराए पर लेने का अनुबंध।" },
"mitigation": { en: "Efforts to reduce the severity of a punishment.", hi: "दंड की गंभीरता को कम करने के प्रयास।" },
"nolo contendere": { en: "A plea where the defendant doesn't admit guilt but won't contest.", hi: "एक याचिका जिसमें प्रतिवादी दोष स्वीकार नहीं करता लेकिन विरोध भी नहीं करता।" },
"ordinance": { en: "A local law or regulation.", hi: "स्थानीय कानून या विनियम।" },
"parole": { en: "Release of a prisoner before full sentence served.", hi: "कैदी को पूरी सजा से पहले रिहा करना।" },
"quash": { en: "To reject or void a legal decision.", hi: "किसी कानूनी निर्णय को रद्द करना।" },
"recuse": { en: "To withdraw from a case due to conflict of interest.", hi: "हितों के टकराव के कारण किसी मामले से हटना।" },
"statutory": { en: "Relating to written laws passed by a legislature.", hi: "विधानसभा द्वारा पारित लिखित कानूनों से संबंधित।" },
"testator": { en: "A person who has made a will.", hi: "जिस व्यक्ति ने वसीयत बनाई हो।" },
"undertaking": { en: "A formal pledge or promise.", hi: "एक औपचारिक वचन या वादा।" },
"venue": { en: "The location where a case is tried.", hi: "जहां मामला सुना जाता है वह स्थान।" },
"writ": { en: "A formal written court order.", hi: "एक औपचारिक लिखित अदालत आदेश।" },
"xenophobia": { en: "Fear or hatred of foreigners, may relate to discrimination cases.", hi: "विदेशियों का भय या घृणा, जो भेदभाव के मामलों से संबंधित हो सकता है।" },
"yearbook": { en: "Annual publication of court decisions or laws.", hi: "अदालती निर्णयों या कानूनों का वार्षिक प्रकाशन।" },
"zeal": { en: "Great energy or enthusiasm in pursuit of a legal cause.", hi: "किसी कानूनी उद्देश्य की प्राप्ति में अत्यधिक ऊर्जा या उत्साह।" },
"abduction": { en: "The act of forcibly taking someone away.", hi: "किसी को जबरदस्ती ले जाने की क्रिया।" },
"accomplice": { en: "A person who helps another commit a crime.", hi: "एक व्यक्ति जो किसी अन्य को अपराध करने में मदद करता है।" },
"adjudication": { en: "A formal judgment or decision by a court.", hi: "अदालत द्वारा औपचारिक निर्णय।" },
"affiliation": { en: "Connection with a group, often for legal purposes.", hi: "कानूनी उद्देश्यों के लिए किसी समूह से संबंध।" },
"alibi": { en: "A claim that one was elsewhere when a crime occurred.", hi: "यह दावा कि अपराध के समय व्यक्ति कहीं और था।" },
"appellant": { en: "A person who files an appeal in court.", hi: "एक व्यक्ति जो अदालत में अपील दायर करता है।" },
"arson": { en: "The criminal act of deliberately setting fire.", hi: "जानबूझकर आग लगाने का आपराधिक कृत्य।" },
"attorney": { en: "A person appointed to act for another in legal matters.", hi: "कानूनी मामलों में किसी अन्य की ओर से कार्य करने वाला व्यक्ति।" },
"admissible": { en: "Acceptable in court as evidence.", hi: "अदालत में साक्ष्य के रूप में स्वीकार्य।" },
"arbitrator": { en: "A neutral third party who resolves disputes.", hi: "एक तटस्थ तीसरा पक्ष जो विवाद सुलझाता है।" },

"barrister": { en: "A lawyer who represents clients in higher courts.", hi: "एक वकील जो उच्च न्यायालयों में ग्राहकों का प्रतिनिधित्व करता है।" },
"bond": { en: "A legal agreement involving payment or obligation.", hi: "भुगतान या दायित्व से जुड़ा एक कानूनी समझौता।" },
"brief": { en: "A written statement presented in a legal case.", hi: "एक कानूनी मामले में प्रस्तुत लिखित बयान।" },
"bailiff": { en: "An officer who maintains order in court.", hi: "एक अधिकारी जो अदालत में व्यवस्था बनाए रखता है।" },
"bequest": { en: "Property left to someone in a will.", hi: "वसीयत में किसी को छोड़ी गई संपत्ति।" },
"bench": { en: "The judge or panel of judges in court.", hi: "अदालत में न्यायाधीश या न्यायाधीशों का समूह।" },
"breach": { en: "Violation of a law or agreement.", hi: "कानून या समझौते का उल्लंघन।" },
"burden of proof": { en: "The obligation to prove one's assertion.", hi: "अपने दावे को साबित करने की जिम्मेदारी।" },
"bill": { en: "A draft of a proposed law.", hi: "प्रस्तावित कानून का मसौदा।" },
"briefing": { en: "A summary of facts and legal points.", hi: "तथ्यों और कानूनी बिंदुओं का सारांश।" },

"law": { en: "A system of rules created and enforced by authorities.", hi: "अधिकारियों द्वारा बनाए और लागू किए गए नियमों की प्रणाली।" },
"justice": { en: "Fair and impartial treatment under the law.", hi: "कानून के तहत निष्पक्ष और न्यायसंगत व्यवहार।" },
"caveat": { en: "A warning or cautionary notice in legal contexts.", hi: "कानूनी संदर्भ में चेतावनी या सावधानी सूचना।" },
"chambers": { en: "Private offices or rooms where a judge may hear cases in private.", hi: "निजी कक्ष जहाँ न्यायाधीश निजी रूप से मामले सुन सकते हैं।" },
"codicil": { en: "An addition or supplement to a will.", hi: "वसीयत में जोड़ा गया पूरक या परिशिष्ट।" },
"complainant": { en: "A person who makes a formal complaint in court.", hi: "एक व्यक्ति जो अदालत में औपचारिक शिकायत करता है।" },
"conviction": { en: "A formal declaration of guilt in a court.", hi: "अदालत द्वारा दोषी ठहराने की औपचारिक घोषणा।" },

"decree": { en: "An official order issued by a legal authority.", hi: "कानूनी प्राधिकरण द्वारा जारी आधिकारिक आदेश।" },
"defendant": { en: "The person being accused or sued in court.", hi: "वह व्यक्ति जिस पर आरोप लगाया गया है या मुकदमा दायर हुआ है।" },
"deposition": { en: "Sworn out-of-court testimony recorded for later use.", hi: "बाद में उपयोग के लिए दर्ज की गई शपथबद्ध गवाही।" },
"due process": { en: "Legal requirement that the state must respect all rights owed.", hi: "कानूनी प्रक्रिया जिसमें राज्य को सभी अधिकारों का सम्मान करना होता है।" },
"discovery": { en: "Exchange of legal information before trial.", hi: "मुकदमे से पहले कानूनी जानकारी का आदान-प्रदान।" },

"evidence": { en: "Material presented to prove or disprove facts.", hi: "तथ्यों को सिद्ध या खंडित करने के लिए प्रस्तुत सामग्री।" },
"embezzlement": { en: "Theft or misappropriation of funds entrusted to one.", hi: "विश्वास में दिए गए धन का गबन या दुरुपयोग।" },
"enactment": { en: "The process of passing a law.", hi: "किसी कानून को पारित करने की प्रक्रिया।" },
"escrow": { en: "A financial arrangement where a third party holds funds.", hi: "एक वित्तीय व्यवस्था जिसमें एक तीसरा पक्ष धन रखता है।" },
"estoppel": { en: "A legal principle preventing contradictory claims.", hi: "विरोधाभासी दावों से रोकने वाला कानूनी सिद्धांत।" },

"felony": { en: "A serious crime such as murder or arson.", hi: "एक गंभीर अपराध जैसे हत्या या आगजनी।" },
"forensic": { en: "Related to scientific tests used in legal cases.", hi: "कानूनी मामलों में प्रयोग होने वाले वैज्ञानिक परीक्षणों से संबंधित।" },
"frivolous": { en: "A legal claim lacking serious purpose or value.", hi: "गंभीर उद्देश्य या मूल्य से रहित कानूनी दावा।" },
"fugitive": { en: "A person who has escaped from custody.", hi: "एक व्यक्ति जो हिरासत से भाग गया हो।" },
"fiduciary": { en: "Relating to trust, especially regarding financial matters.", hi: "विश्वास से संबंधित, विशेष रूप से वित्तीय मामलों में।" },

"garnishment": { en: "Court order to withhold earnings for debt payment.", hi: "कर्ज चुकाने के लिए वेतन रोकने का अदालती आदेश।" },
"grievance": { en: "A legal complaint due to unfair treatment.", hi: "अनुचित व्यवहार के कारण कानूनी शिकायत।" },
"grand jury": { en: "A group that decides whether there is enough evidence for a trial.", hi: "एक समूह जो तय करता है कि मुकदमे के लिए पर्याप्त साक्ष्य हैं या नहीं।" },
"guardian": { en: "A person legally appointed to care for another.", hi: "किसी अन्य की देखभाल के लिए कानूनी रूप से नियुक्त व्यक्ति।" },
"good faith": { en: "Honest intent to act fairly without deception.", hi: "ईमानदारी से और बिना धोखे के निष्पक्ष व्यवहार की मंशा।" },

"habeas corpus": { en: "A legal action to bring a person before a court.", hi: "व्यक्ति को अदालत में लाने के लिए कानूनी प्रक्रिया।" },
"hearing": { en: "A legal proceeding before a judge.", hi: "न्यायाधीश के सामने कानूनी प्रक्रिया।" },
"hostile witness": { en: "A witness who does not cooperate in court.", hi: "एक गवाह जो अदालत में सहयोग नहीं करता।" },
"hearsay": { en: "Evidence based on what someone else said.", hi: "किसी और की कही बात पर आधारित साक्ष्य।" },
"harassment": { en: "Unwanted conduct that causes distress.", hi: "अनचाहा व्यवहार जो परेशानी पैदा करता है।" },

"injunction": { en: "A court order to stop an action.", hi: "किसी कार्रवाई को रोकने का अदालत का आदेश।" },
"indictment": { en: "A formal charge of a serious crime.", hi: "गंभीर अपराध का औपचारिक आरोप।" },
"intestate": { en: "Dying without a legal will.", hi: "बिना कानूनी वसीयत के मरना।" },
"immunity": { en: "Legal protection from prosecution.", hi: "अभियोग से कानूनी सुरक्षा।" },
"inquest": { en: "A judicial inquiry to ascertain facts.", hi: "तथ्यों की पुष्टि के लिए न्यायिक जांच।" },
"jurisdiction": { en: "The legal authority to hear and decide cases.", hi: "मामलों को सुनने और निर्णय लेने की कानूनी अधिकारिता।" },
"juror": { en: "A member of a jury who helps decide a verdict.", hi: "जूरी का सदस्य जो निर्णय में मदद करता है।" },
"justice": { en: "Fair treatment through legal processes.", hi: "कानूनी प्रक्रियाओं के माध्यम से निष्पक्षता।" },
"judgment": { en: "The final decision of a court.", hi: "अदालत का अंतिम निर्णय।" },
"joinder": { en: "Combining two or more legal issues in one case.", hi: "एक ही मामले में दो या अधिक कानूनी मुद्दों का संयोजन।" },

"kidnap": { en: "To unlawfully take someone away by force.", hi: "किसी को जबरदस्ती अवैध रूप से ले जाना।" },
"knowledge of law": { en: "Understanding legal rules and rights.", hi: "कानूनी नियमों और अधिकारों की समझ।" },
"knowingly": { en: "With awareness and intent.", hi: "जानबूझकर और इरादे से।" },
"kangaroo court": { en: "An unofficial or biased court.", hi: "गैर-आधिकारिक या पक्षपाती अदालत।" },
"key witness": { en: "A crucial person who provides important testimony.", hi: "एक महत्वपूर्ण व्यक्ति जो अहम गवाही देता है।" },

"litigation": { en: "The process of taking legal action.", hi: "कानूनी कार्रवाई की प्रक्रिया।" },
"liability": { en: "Legal responsibility for one's actions.", hi: "किसी के कार्यों के लिए कानूनी ज़िम्मेदारी।" },
"leniency": { en: "Being less severe in punishment.", hi: "सजा में नरमी बरतना।" },
"law": { en: "A system of rules enforced by institutions.", hi: "संस्थाओं द्वारा लागू किया गया नियमों का एक तंत्र।" },
"lawsuit": { en: "A legal case brought before a court.", hi: "अदालत में लाया गया कानूनी मामला।" },

"mediation": { en: "Resolving disputes with the help of a neutral third party.", hi: "किसी तटस्थ तीसरे पक्ष की मदद से विवादों का समाधान।" },
"misdemeanor": { en: "A minor wrongdoing or criminal offense.", hi: "एक छोटा अपराध या ग़लती।" },
"moot": { en: "A subject open to debate, often hypothetical in law school.", hi: "एक बहस योग्य विषय, अक्सर कानून की पढ़ाई में।" },
"motion": { en: "A formal request made to the court.", hi: "अदालत में किया गया औपचारिक अनुरोध।" },
"manslaughter": { en: "Unintentional killing of a person.", hi: "अजानते हुए किसी व्यक्ति की हत्या।" },

"negligence": { en: "Failure to take proper care, causing harm.", hi: "उचित देखभाल में चूक, जिससे नुकसान होता है।" },
"notary": { en: "A person authorized to perform certain legal formalities.", hi: "कानूनी औपचारिकताएं पूरा करने के लिए अधिकृत व्यक्ति।" },
"nolo contendere": { en: "A plea where the defendant accepts conviction but doesn't admit guilt.", hi: "एक दलील जिसमें दोषी मान लिया जाता है लेकिन अपराध स्वीकार नहीं किया जाता।" },
"null and void": { en: "Having no legal effect.", hi: "जिसका कोई कानूनी प्रभाव नहीं होता।" },
"non-disclosure": { en: "Legal agreement to keep certain info confidential.", hi: "कुछ जानकारी को गोपनीय रखने का कानूनी समझौता।" },

"objection": { en: "A formal protest in court.", hi: "अदालत में औपचारिक आपत्ति।" },
"oath": { en: "A solemn promise to tell the truth.", hi: "सच बोलने की गंभीर शपथ।" },
"offense": { en: "A breach of law or illegal act.", hi: "कानून का उल्लंघन या गैरकानूनी कार्य।" },
"order": { en: "A directive issued by a judge or court.", hi: "न्यायाधीश या अदालत द्वारा जारी निर्देश।" },
"oral argument": { en: "Spoken presentation before a judge or jury.", hi: "न्यायाधीश या जूरी के सामने मौखिक प्रस्तुति।" },

"plaintiff": { en: "The person who brings a case against another in court.", hi: "वह व्यक्ति जो अदालत में मामला दायर करता है।" },
"plea": { en: "The defendant’s formal response to charges.", hi: "आरोपों पर आरोपी की औपचारिक प्रतिक्रिया।" },
"probation": { en: "A period of supervision instead of jail.", hi: "जेल के बजाय निगरानी में रहने की अवधि।" },
"precedent": { en: "A prior legal case used as an example.", hi: "एक पूर्व कानूनी मामला जो उदाहरण के रूप में उपयोग किया जाता है।" },
"perjury": { en: "Lying under oath.", hi: "शपथ लेकर झूठ बोलना।" },

"quash": { en: "To reject or void a legal proceeding.", hi: "किसी कानूनी प्रक्रिया को रद्द करना।" },
"quorum": { en: "Minimum number of people needed for a legal meeting.", hi: "कानूनी बैठक के लिए आवश्यक न्यूनतम सदस्य संख्या।" },
"quid pro quo": { en: "A mutual exchange, often in legal terms.", hi: "एक पारस्परिक लेन-देन, अक्सर कानूनी संदर्भ में।" },
"quiet title": { en: "A legal action to settle property ownership disputes.", hi: "संपत्ति के स्वामित्व विवाद सुलझाने की कानूनी प्रक्रिया।" },
"qualified immunity": { en: "Protection for officials from certain lawsuits.", hi: "अधिकारियों को कुछ मुकदमों से सुरक्षा।" },

"restitution": { en: "Compensation for loss or injury.", hi: "नुकसान या चोट के लिए मुआवज़ा।" },
"remand": { en: "To send a case back to a lower court.", hi: "मामले को निचली अदालत में वापस भेजना।" },
"revoke": { en: "To cancel a legal right or document.", hi: "किसी कानूनी अधिकार या दस्तावेज़ को रद्द करना।" },
"recuse": { en: "To withdraw from a case due to conflict of interest.", hi: "हितों के टकराव के कारण मामले से हटना।" },
"ratify": { en: "To formally approve an agreement.", hi: "किसी समझौते को औपचारिक रूप से मंजूरी देना।" },

"subpoena": { en: "A legal document ordering someone to court.", hi: "किसी को अदालत बुलाने का कानूनी दस्तावेज़।" },
"settlement": { en: "An agreement between parties to resolve a dispute.", hi: "विवाद को सुलझाने के लिए पक्षों के बीच समझौता।" },
"statute": { en: "A written law passed by a legislature.", hi: "किसी विधायिका द्वारा पारित लिखित कानून।" },
"sentence": { en: "Punishment assigned to a convicted person.", hi: "दोषी व्यक्ति को दी गई सजा।" },
"summons": { en: "A legal notice to appear in court.", hi: "अदालत में पेश होने के लिए कानूनी नोटिस।" },

"testimony": { en: "A formal statement given in court.", hi: "अदालत में दिया गया औपचारिक बयान।" },
"trial": { en: "A formal examination of evidence in court.", hi: "अदालत में साक्ष्य की औपचारिक जांच।" },
"tort": { en: "A civil wrong causing harm or loss.", hi: "एक नागरिक गलती जो नुकसान या हानि पहुंचाती है।" },
"trustee": { en: "A person who manages assets on behalf of others.", hi: "दूसरों की ओर से संपत्ति का प्रबंधन करने वाला व्यक्ति।" },
"tribunal": { en: "A special court to resolve specific disputes.", hi: "विशिष्ट विवादों के समाधान के लिए एक विशेष न्यायाधिकरण।" },

"undertaking": { en: "A formal promise or commitment.", hi: "एक औपचारिक वादा या प्रतिबद्धता।" },
"uphold": { en: "To confirm or support a legal decision.", hi: "किसी कानूनी निर्णय की पुष्टि करना या समर्थन करना।" },
"unlawful": { en: "Not permitted by law.", hi: "कानून द्वारा अनुमति प्राप्त नहीं।" },
"usurp": { en: "To take power or rights illegally.", hi: "अवैध रूप से अधिकार या शक्ति छीनना।" },
"unconstitutional": { en: "Contrary to what is allowed by the constitution.", hi: "संविधान द्वारा अनुमति प्राप्त नहीं।" },

"verdict": { en: "The decision of a jury or judge.", hi: "जूरी या न्यायाधीश का निर्णय।" },
"venue": { en: "The location where a trial is held.", hi: "जहाँ मुकदमा चलाया जाता है वह स्थान।" },
"veto": { en: "The power to reject a proposed law.", hi: "प्रस्तावित कानून को अस्वीकार करने की शक्ति।" },
"voir dire": { en: "A preliminary examination of a witness or juror.", hi: "गवाह या जूरी सदस्य की प्रारंभिक जांच।" },
"vicarious liability": { en: "Legal responsibility for another's actions.", hi: "किसी और के कार्यों के लिए कानूनी ज़िम्मेदारी।" },

"warrant": { en: "A legal document authorizing an action.", hi: "कोई कार्रवाई करने की अनुमति देने वाला कानूनी दस्तावेज़।" },
"writ": { en: "A formal written order from a court.", hi: "अदालत से जारी औपचारिक लिखित आदेश।" },
"witness": { en: "Someone who sees or experiences an event.", hi: "कोई जो किसी घटना को देखता या अनुभव करता है।" },
"waiver": { en: "Voluntary relinquishment of a legal right.", hi: "किसी कानूनी अधिकार का स्वेच्छा से परित्याग।" },
"with prejudice": { en: "A case dismissed permanently.", hi: "स्थायी रूप से खारिज किया गया मामला।" },

"xerox copy": { en: "Photocopy used in legal documentation.", hi: "कानूनी दस्तावेजों में प्रयुक्त फोटोकॉपी।" },
"xenophobia (contextual)": { en: "Discrimination that may result in legal action.", hi: "कानूनी कार्रवाई की संभावना वाला भेदभाव।" },
"x-mark": { en: "Used by illiterate persons for legal signature.", hi: "अनपढ़ व्यक्तियों द्वारा हस्ताक्षर के रूप में प्रयुक्त चिह्न।" },
"x-ray evidence": { en: "Medical evidence in injury-related cases.", hi: "चोट से संबंधित मामलों में चिकित्सीय साक्ष्य।" },
"ex parte (X-related)": { en: "Legal proceeding where one party is not present.", hi: "एक पक्ष की अनुपस्थिति में कानूनी कार्रवाई।" },

"youth offender": { en: "A minor who has broken the law.", hi: "एक नाबालिग जिसने कानून तोड़ा है।" },
"yearbook of law": { en: "An annual legal reference publication.", hi: "वार्षिक कानूनी संदर्भ प्रकाशन।" },
"yield": { en: "To submit or give up a legal claim.", hi: "किसी कानूनी दावे को छोड़ देना।" },
"yellow-dog contract": { en: "Illegal employment contract restricting union rights.", hi: "संघ अधिकारों को सीमित करने वाला अवैध रोजगार अनुबंध।" },
"youth court": { en: "Special court for juvenile offenders.", hi: "किशोर अपराधियों के लिए विशेष अदालत।" },

"zoning": { en: "Municipal law regulating land use.", hi: "भूमि उपयोग को नियंत्रित करने वाला नगर निगम कानून।" },
"zero tolerance": { en: "Strict enforcement of laws without exceptions.", hi: "बिना किसी अपवाद के कानूनों का सख्त पालन।" },
"zealous defense": { en: "Vigorous representation of a client by a lawyer.", hi: "वकील द्वारा मुवक्किल का जोरदार पक्ष रखना।" },
"zoning appeal": { en: "A challenge to local zoning laws.", hi: "स्थानीय ज़ोनिंग कानूनों को चुनौती देना।" },
"zoning ordinance": { en: "A rule defining land use in specific areas.", hi: "विशिष्ट क्षेत्रों में भूमि उपयोग निर्धारित करने वाला नियम।" },
"contract": { en: "A legally binding agreement.", hi: "एक कानूनी बाध्यकारी समझौता।" },
    "bail": { en: "Temporary release from custody.", hi: "अस्थायी रूप से हिरासत से रिहाई।" },
    "witness": { en: "A person who sees an event happen.", hi: "एक व्यक्ति जो किसी घटना को देखता है।" },
    "plaintiff": { en: "A person who brings a case to court.", hi: "जो व्यक्ति अदालत में मामला लाता है।" },
    "defendant": { en: "A person accused in a case.", hi: "जिस व्यक्ति पर मामला दर्ज है।" },
    "lawsuit": { en: "A legal case brought to court.", hi: "अदालत में लाया गया एक कानूनी मामला।" },
    "legal": { en: "Allowed by law.", hi: "कानून द्वारा अनुमति प्राप्त।" },
    "illegal": { en: "Not allowed by law.", hi: "कानून के खिलाफ।" },
    "injustice": { en: "Lack of fairness or justice.", hi: "अन्याय या न्याय की कमी।" },
    "laundering": { en: "Concealing the origins of illegally obtained money.", hi: "अवैध रूप से प्राप्त धन की उत्पत्ति को छिपाना।" },
    "summon": { en: "An official order to appear in court.", hi: "अदालत में उपस्थित होने का आधिकारिक आदेश।" },
    "trial": { en: "A legal process in court to decide a case.", hi: "मामला तय करने की अदालत की कानूनी प्रक्रिया।" },
    "appeal": { en: "Request to a higher court to review a decision.", hi: "किसी निर्णय की समीक्षा के लिए उच्च न्यायालय से अनुरोध।" },
    "arrest": { en: "To take someone into custody legally.", hi: "कानूनी रूप से किसी को हिरासत में लेना।" },
    "evidence": { en: "Facts or information used in court.", hi: "अदालत में इस्तेमाल किए गए तथ्य या जानकारी।" },
    "judge": { en: "A public official who decides cases in court.", hi: "एक सार्वजनिक अधिकारी जो अदालत में मामलों का निपटारा करता है।" },
    "lawyer": { en: "A person who practices or studies law.", hi: "कानून का अभ्यास या अध्ययन करने वाला व्यक्ति।" },
    "fine": { en: "Money paid as a penalty.", hi: "दंड के रूप में भुगतान की गई राशि।" },
    "custody": { en: "Protective care or guardianship; or legal detention.", hi: "संरक्षण या हिरासत।" },
    "verdict": { en: "A decision made by a jury or judge.", hi: "जूरी या न्यायाधीश द्वारा लिया गया निर्णय।" },
    "court": { en: "A place where legal cases are heard.", hi: "वह स्थान जहाँ कानूनी मामले सुने जाते हैं।" },
    "judge": { en: "The person who presides over court proceedings.", hi: "जो व्यक्ति अदालत की कार्यवाही की अध्यक्षता करता है।" },
    "jury": { en: "A group of people who decide the verdict in a trial.", hi: "एक समूह जो मुकदमे में निर्णय देता है।" },
    "sentence": { en: "Punishment given to a guilty person.", hi: "दोषी व्यक्ति को दी गई सजा।" },
    "probation": { en: "A period of supervision instead of jail.", hi: "जेल की जगह निगरानी की अवधि।" },
    "parole": { en: "Early release from prison under conditions.", hi: "शर्तों के साथ जेल से जल्दी रिहाई।" },
    "testimony": { en: "A statement given in court.", hi: "अदालत में दिया गया बयान।" },
    "hearing": { en: "A session in court before a judge.", hi: "न्यायाधीश के समक्ष अदालत की कार्यवाही।" },
    "notice": { en: "A formal warning or announcement.", hi: "एक औपचारिक चेतावनी या घोषणा।" },
    "agreement": { en: "A mutual decision or understanding.", hi: "एक आपसी निर्णय या समझ।" },
    "settlement": { en: "An agreement to resolve a dispute.", hi: "विवाद सुलझाने का समझौता।" },
    "charge": { en: "An official accusation.", hi: "एक आधिकारिक आरोप।" },
    "acquittal": { en: "A judgment that a person is not guilty.", hi: "यह निर्णय कि व्यक्ति दोषी नहीं है।" },
    "conviction": { en: "A formal declaration of guilt.", hi: "दोष सिद्ध होने की औपचारिक घोषणा।" },
    "breach": { en: "Breaking a law or agreement.", hi: "कानून या समझौते का उल्लंघन।" },
    "claim": { en: "A demand for something as rightful.", hi: "किसी चीज़ के लिए अधिकारपूर्वक माँग।" },
    "notary": { en: "An official authorized to witness signatures.", hi: "हस्ताक्षरों को प्रमाणित करने वाला अधिकारी।" },
    "alibi": { en: "Proof someone was elsewhere when a crime happened.", hi: "यह प्रमाण कि अपराध के समय कोई और जगह था।" },
    "assault": { en: "Physical or verbal attack.", hi: "शारीरिक या मौखिक हमला।" },
    "theft": { en: "Stealing someone’s property.", hi: "किसी की संपत्ति की चोरी।" },
    "fraud": { en: "Wrongful deception for personal gain.", hi: "व्यक्तिगत लाभ के लिए गलत धोखाधड़ी।" },
    "corruption": { en: "Dishonest or illegal behavior by authorities.", hi: "अधिकारियों द्वारा बेईमानी या अवैध व्यवहार।" },
    "warrant": { en: "A legal document allowing an action.", hi: "किसी कार्रवाई की अनुमति देने वाला कानूनी दस्तावेज़।" },
    "detain": { en: "To keep someone in custody.", hi: "किसी को हिरासत में रखना।" },
    "statement": { en: "A spoken or written declaration.", hi: "मौखिक या लिखित घोषणा।" },
    "complaint": { en: "A formal accusation or expression of grievance.", hi: "औपचारिक आरोप या शिकायत।" },
    "dispute": { en: "A disagreement or argument.", hi: "एक असहमति या विवाद।" },
    "heir": { en: "A person entitled to inherit property.", hi: "वह व्यक्ति जिसे संपत्ति विरासत में मिलती है।" },
    "property": { en: "Something owned legally.", hi: "कानूनी रूप से स्वामित्व वाली वस्तु।" },
    "injunction": { en: "A legal order stopping an action.", hi: "किसी कार्य को रोकने का कानूनी आदेश।" },
    "evasion": { en: "Act of avoiding something, especially law or tax.", hi: "किसी चीज़ से बचने का कार्य, खासकर कानून या कर।" },
    "forgery": { en: "Faking documents or signatures.", hi: "दस्तावेजों या हस्ताक्षरों की नक़ल।" },
    "corruption": { en: "Dishonest or illegal actions.", hi: "बेईमानी या अवैध कार्य।" },
  "bribe": { en: "Money given to influence someone.", hi: "किसी को प्रभावित करने के लिए दी गई रिश्वत।" },
  "fraud": { en: "Wrongful deception for personal gain.", hi: "व्यक्तिगत लाभ के लिए गलत धोखा।" },
  "cheating": { en: "Act of being dishonest.", hi: "ईमानदारी से काम न करना।" },
  "rights": { en: "Legal entitlements.", hi: "कानूनी अधिकार।" },
  "constitution": { en: "Fundamental law of a nation.", hi: "किसी राष्ट्र का मूल कानून।" },
  "custody": { en: "State of being detained.", hi: "हिरासत में होना।" },
  "detention": { en: "Act of keeping someone in custody.", hi: "किसी को हिरासत में रखना।" },
  "evasion": { en: "Avoiding something illegally.", hi: "अवैध रूप से बचना।" },
  "forgery": { en: "Making fake documents.", hi: "नकली दस्तावेज़ बनाना।" },
  "harassment": { en: "Aggressive pressure or intimidation.", hi: "आक्रामक दबाव या डराना।" },
  "assault": { en: "Physical attack.", hi: "शारीरिक हमला।" },
  "theft": { en: "Act of stealing.", hi: "चोरी का कार्य।" },
  "robbery": { en: "Stealing using force.", hi: "बलपूर्वक चोरी करना।" },
  "murder": { en: "Unlawful killing of a person.", hi: "किसी व्यक्ति की अवैध हत्या।" },
  "rape": { en: "Sexual assault.", hi: "बलात्कार।" },
  "trespass": { en: "Entering without permission.", hi: "बिना अनुमति के प्रवेश करना।" },
  "negligence": { en: "Failure to take care.", hi: "देखभाल करने में असफलता।" },
  "breach": { en: "Violation of law or agreement.", hi: "कानून या समझौते का उल्लंघन।" },
  "pardon": { en: "Forgiveness for a crime.", hi: "अपराध के लिए क्षमा।" },
  "injunction": { en: "Court order to stop something.", hi: "कुछ रोकने का अदालत का आदेश।" },
  "litigation": { en: "Process of taking legal action.", hi: "कानूनी कार्रवाई की प्रक्रिया।" }

};

