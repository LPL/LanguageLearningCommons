# encoding: UTF-8

mandarin = Language.create!(name: "Mandarin")
spanish = Language.create!(name: "Spanish")
english = Language.create!(name: "English")
hindi = Language.create!(name: "Hindi")
arabic = Language.create!(name: "Arabic")
portuguese = Language.create!(name: "Portuguese")
# bengali = Language.create!(name: "Bengali")
# russian = Language.create!(name: "Russian")
# japanese = Language.create!(name: "Japanese")
# punjabi = Language.create!(name: "Punjabi")
# german = Language.create!(name: "German")

seed_languages = [mandarin, spanish, english, hindi, arabic]

wen = User.create!(name: "Wen", email: "w@e.n", password: "123123123")
bao = User.create!(name: "Bao", email: "b@a.o", password: "123123123")

paz = User.create!(name: "Paz", email: "p@a.z", password: "123123123")
cid = User.create!(name: "Cid", email: "c@i.d", password: "123123123")

kim = User.create!(name: "Kim", email: "k@i.m", password: "123123123")
gus = User.create!(name: "Gus", email: "g@u.s", password: "123123123")

yas = User.create!(name: "Yas", email: "y@a.s", password: "123123123")
ali = User.create!(name: "Ali", email: "a@l.i", password: "123123123")


# def assign_languages(user, language_type)
# 	language_count = ((Math.tan((rand*1.15)**2)**0.2)*2.8).floor
# 	language_count.times do
# 		language_fits = false
# 		until language_fits
# 			debugger
# 			candidate_language = seed_languages[(rand*6).floor]
# 			unless user.known_languages.include?(candidate_language) ||
# 				   user.learning_languages.include?(candidate_language)
# 				(language_type == :known ? Knowing : Learning)
# 					.create!(language: candidate_language, user: user)
# 				language_fits = true
# 			end
# 		end
# 	end
# end

# def languate_user(user)
# 	assign_languages(user, :known)
# 	assign_languages(user, :learning)
# end

# languate_user(wen)

Knowing.create!(language: mandarin, user: wen)
Knowing.create!(language: arabic, user: wen)
Learning.create!(language: hindi, user: wen)
Learning.create!(language: spanish, user: wen)

Knowing.create!(language: mandarin, user: bao)
Learning.create!(language: arabic, user: bao)

Knowing.create!(language: spanish, user: paz)
Knowing.create!(language: mandarin, user: paz)
Knowing.create!(language: hindi, user: paz)
Learning.create!(language: english, user: paz)

Knowing.create!(language: spanish, user: cid)
Learning.create!(language: mandarin, user: cid)

Knowing.create!(language: english, user: kim)
Knowing.create!(language: hindi, user: kim)
Learning.create!(language: mandarin, user: kim)
Learning.create!(language: arabic, user: kim)

Knowing.create!(language: english, user: gus)
Learning.create!(language: spanish, user: gus)

Knowing.create!(language: arabic, user: yas)
Learning.create!(language: hindi, user: yas)
Learning.create!(language: english, user: yas)
Learning.create!(language: mandarin, user: yas)

Knowing.create!(language: arabic, user: ali)
Learning.create!(language: english, user: ali)

wen.bebuddy(bao)
paz.bebuddy(cid)
kim.bebuddy(gus)
yas.bebuddy(ali)

wen.bebuddy(paz)
paz.bebuddy(kim)
kim.bebuddy(yas)
yas.bebuddy(wen)

bao.bebuddy(ali)
cid.bebuddy(bao)
gus.bebuddy(cid)
ali.bebuddy(gus)

BuddyshipProposal.create!(proposing_user: yas, target_user: paz)

mandarin_text = "海洋即“海”和“洋”的总称。地球的四分之三的面积被海洋覆盖。總面積大約为3亿5525万5千平方公里。一般人们将这些占地球很大面积的咸水水域称为“洋”，大陆边缘的水域被称为“海”。少数地球以外的星体也有海洋，一些尚有海洋或冰洋，如卫星土卫六、木卫二，一些行星如火星、金星曾经可能有过海洋或火浆洋。海裡的水總是依照有規律的明確形式流動，循環不息，稱為洋流。其中比較有名的是墨西哥灣流，最狹窄處也寬達50哩，流動時速可達4哩，沿北美洲海岸北上，橫過北大西洋，調節北歐的氣候。北太平洋海流是一道類似的暖流，從熱帶向北流，提高北美洲西岸的氣溫。 盛行風是使海流運動不息的主要力量。海水密度不同，也是海流成因之一。冷水的密度比暖水高，因此冷水下沉，暖水上升。基於同樣原理，兩極附近的冷水也下沉，在海面以下向赤道流去。抵達赤道時，這股水流便上升，代替隨著表面海流流向兩極的暖水。 島嶼與大陸的海岸，對海流也有影響，不是使海流轉向，就是把海流分成支流。不過一般來說，主要的海流都是沿著各個海洋盆地四周環流的。由於地球自轉所產生的科氏力影響，北半球的海流以順時針方向流動，南半球的則相反。海水所含的鹽分各處不同，平均約為3.5%。這些溶解在海水中的無機鹽，最常見的是氯化鈉，即日用的食鹽。 有些鹽來自海底的火山，但大部分來自地殼的岩石。岩石受風化而崩解，釋出鹽類，再由河水帶到海裡去。在海水氣化後再凝結成水的循環過程中，海水蒸發後，鹽留下來，逐漸積聚到現有的濃度。 海洋所含的鹽極多，可以在全球陸地上鋪成約厚500呎(500英尺（150米）)的鹽層。波浪不斷在海上翻滾，有時波平如鏡，有時卻巨浪滔天。除了那些由地震或火山爆發造成的波浪外，波浪多半由吹過海面的風引起，遠處暴風雨所攪起的波浪，可能移動數百哩才抵達岸邊。 浪與浪之間由波峰至槽底的高度，多半不超過10呎(10英尺（3米）)。不過在暴風雨中，波浪可能高得驚人；1933年，在太平洋錄得的最大波浪高達112呎(112英尺（34米）)。少數像火山島之類的陸塊，邊緣會陡峭地落入海中。但在大陸周圍，大多數是覆蓋著淺淺海水的架形陸塊，是大陸的延伸部分，稱為大陸架。大陸架通常徐徐向下斜伸至海面下約650呎，然後陡峭地落下到海底。大陸架的陡邊稱為大陸斜坡。大多數大陸架延伸至離岸約50哩處；有些狹窄得多；不過，西伯利亞北岸的大陸架卻寬達800哩，遠伸入北極海內。世界大部分漁獲，都是來自大陸架上豐饒的水域；各國更聲稱擁有其海岸以外大陸架的主權，把其中的石油、礦藏和其他資源據為己有。早在史前人类就已经在海洋上旅行，从海洋中捕鱼，以海洋为生，对海洋进行探索。在航空发展之前，航海是人类跨大陆运输和旅行的主要方式。 对深海海底的探索一直到20世纪中才真正开始。虽然今天人类对海洋用潜水球、潜水艇、机器人、科学勘探船舰、自动浮标一直到人造卫星进行探索，但人类对海洋、它与大陆和空气的交换作用以及深海还所知甚鱼的血液循环是封闭的，其心脏比较简单，位于鳃附近，由一个心房和一个心室组成。鱼的鳃由许多有许多毛细血管的小叶。通过它巨大的面积它将水中溶解的氧吸收到血液中。鱼鳃的功率非常高（有些鱼可以利用70%的水溶解的氧），这可能说明鱼的红血球的功率很高。硬骨鱼的鳃外有一块角质的盖，鱼在呼吸时同时张嘴和将鳃盖打开，这样将水吸入口中，鳃盖上的膜防止水从这个方向流入。合嘴时可以通过嘴前部的一个机构将水从鳃缝中挤出去。软骨鱼没有鳃盖，它们必须不停地张着嘴游动，来让水通过它们的鳃流过。一些硬骨鱼（比如鳗鱼）的鳃缝非常小，它们的鳃在陆地上也可以保持一段时间潮湿，这样它们可以在陆地上呼吸一段时间。一些其它多多少少可以两栖的鱼还有其它的呼吸器官：有些鱼可以通过皮肤直接呼吸空气中的氧，有些鱼可以将空气吸入肠内，其流畅良好的肠壁可以吸收空气中的氧。有些鱼身上有突出器官可以作为呼吸器官使用，一些鱼的鱼鳔与它们的肠相连，它们的鱼泡也可以用来辅助呼吸空气中的氧。肺鱼的肠的突出物已经演化为肺了。鱼鳔 鱼鳔的主要用处不是呼吸，鱼靠鱼鳔来调节它们的比重，通过鱼鳔它们可以不用运动就缓慢上升或下降，大部分硬骨魚類皆有魚鰾這個調節浮力的器官。鱼鳔本来是肠的一个扩充，有些鱼如鲤鱼的鱼鳔还和它的肠相连，其它的鱼如鲈鱼的鱼鳔已经和肠完全分开了。假如一条鱼要减轻它的比重的话，它将血液中溶解的气体释放到鱼鳔中去，有些鱼使用鱼鳔中一个血管很多的地方来充气，其它鱼通过肠和一个连接肠和鱼鳔的管道。通过同样的方式鱼也可以将气体重新溶入血液中来加大它们的比重。鰾也可以做為發聲共鳴的器官。软骨鱼、一些在水底生活的鱼和专长快游的硬骨鱼没有鱼鳔，它们假如不运动的话就会沉到水底。"
spanish_text = "Los océanos de la Tierra también desempeñan un papel vital en limpiar la atmósfera, y algunas actividades del hombre pueden alterarlos severamente. Los océanos absorben enormes cantidades de dióxido de carbono. A su vez, el fitoplancton absorbe el dióxido de carbono y desprende oxígeno. El Dr. George Small explica la importancia de este ciclo de vida: «El 70% del oxígeno que se añade a la atmósfera cada año proviene del plancton que hay en el mar». No obstante, algunos científicos advierten que el fitoplancton pudiera disminuir grávemente debido a la reducción del ozono en la atmósfera, de lo cual se cree que el hombre es responsable.Algunos países acceden a limitar los desechos que permiten que se arrojen al mar, otros rehúsan hacerlo. El famoso explorador oceánico Jacques Cousteau advirtió: «Tenemos que salvar los océanos si queremos salvar a la humanidad». Es significativa la concentración de peces en pequeñas zonas del océano y su escasez en otras partes. Tal como advirtió William Ricker, biólogo de pesca: El mar no es «un depósito ilimitado de energía alimentaria». Y el explorador submarino Jacques-Yves Cousteau advirtió, al regresar de una exploración submarina mundial, que la vida en los océanos ha disminuido en un 40 por ciento desde 1950 debido al pescar en demasía y a la contaminación. El científico marino suizo Dr. Jacques Piccard predijo que en vista de la proporción actual de la contaminación, los océanos del mundo quedarían desprovistos de vida en 25 años. Dijo que debido a su poca profundidad el mar Báltico sería el primero en morir. Después morirían el Adriático y el Mediterráneo, los cuales no tienen corrientes lo suficientemente fuertes para transportar la contaminación. También, el explorador submarino francés Jacques-Yves Cousteau dijo que la destrucción de los océanos ya se ha efectuado en un 20-30%. Predijo «el fin de todo en 30 a 50 años a menos que se tome acción inmediata». Parte de esta contaminación se debe a que l"
english_text = "Oceanographers divide the ocean into different zones depending on the present physical and biological conditions. The pelagic zone includes all open ocean regions, and can be divided into further regions categorized by depth and light abundance. The photic zone covers the oceans from surface level to 200 metres down. This is the region where photosynthesis can occur and therefore is the most biodiverse. Since plants require photosynthesis, life found deeper than this must either rely on material sinking from above (see marine snow) or find another energy source; hydrothermal vents are the primary option in what is known as the aphotic zone (depths exceeding 200 m). The pelagic part of the photic zone is known as the epipelagic. The pelagic part of the aphotic zone can be further divided into regions that succeed each other vertically according to temperature. The mesopelagic is the uppermost region. Its lowermost boundary is at a thermocline of 12 °C (54 °F), which, in the tropics generally lies at 700–1,000 metres (2,300–3,300 ft). Next is the bathypelagic lying between 10 and 4 °C (50 and 39 °F), typically between 700–1,000 metres (2,300–3,300 ft) and 2,000–4,000 metres (6,600–13,000 ft) Lying along the top of the abyssal plain is the abyssopelagic, whose lower boundary lies at about 6,000 metres (20,000 ft). The last zone includes the deep trenches, and is known as the hadalpelagic. This lies between 6,000–11,000 metres (20,000–36,000 ft) and is the deepest oceanic zone. Along with pelagic aphotic zones there are also benthic aphotic zones. These correspond to the three deepest zones of the deep-sea. The bathyal zone covers the continental slope down to about 4,000 metres (13,000 ft). The abyssal zone covers the abyssal plains between 4,000 and 6,000 m. Lastly, the hadal zone corresponds to the hadalpelagic zone which is found in the oceanic trenches. The pelagic zone can also be split into two subregions, the neritic zone and the oceanic"
hindi_text = "वैज्ञानिक अन्वेषकों तथा साहसिक नाविकों द्वारा इस महासागर के विषय में ज्ञान प्राप्त करने के अनेक प्रयत्न किए गए तथा अब भी इसका अध्ययन जारी है। सर्वप्रथम पेटरब्युक महोदय ने इसके बारे में पता लगाना आरंभ किया। इसके पश्चात् बैलबोआ, मागेमेनदान्या, हॉरिस (Horace), कुकु आदि यूरोपियनों ने प्रयत्न किया। द्वितीय विश्व महायुद्ध समाप्त होने पर संयुक्त राष्ट्र ने इसके बारे में खर्च के निमित्त अनेक प्रयास किए, जो सफल व्यापार तथा पूँजी विनियोग के विकास के लिये लाभदायक सिद्ध हुए। अब भी निरंतर प्रशांत महासागर के गर्भ के बारे में ज्ञान प्राप्त करने के लिये अन्वेषण जारी हैं। इसका क्षेत्रफल 6,36,34,000 वर्ग मील, अर्थात अटलांटिक महासागर के दुगुने से भी अधिक है। यह फिलिपींस तट से लेकर पनामा 9,455 मील चौड़ा तथा बेरिंग जलडमरूमध्य से लेकर दक्षिण अंटार्कटिका तक 10,492 मील लंबा है। यह समस्त भूभाग से ला मील अधिक क्षेत्र में फैला है। इसका उत्तरी किनारा केवल 36 मील का बेरिंग जलडमरूमध्य द्वारा आर्कटिक सागर से जुडा है। इसका इतने बड़े क्षेत्र में फैले होने के कारण यहाँ के निवासी, वनस्पति, पशु तथा मनुष्यों की रहन-सहन में पृथ्वी के अन्य भागों के सागरों की अपेक्षा बड़ी विभिन्नता है। प्रशांत महासागर की औसत गहराई लगभग 14,000 फुट है तथा अधिकतम गहराई लगभग 35,400 फुट है, तब ग्वैम और मिंडानो के मध्य में है। यह महासागर अटलांटिक महासागर का सहवर्ती है। इसके पूर्वी एवं पश्चिमी किनारों में बड़ा अंतर है। पूर्वी किनारे पर पर्वतों का क्रम फैला है, या समुद्री मैदान बहुत ही सँकरे है। इसी कारण यहाँ अच्छे अच्छे बंदरगाहों का अभाव है तथा सभ्यता की भी अधिक उन्नति नहीं हो पाई है। बेरिंग जलडमरूमध्य बर्फ से जमा रहता है, जिससे यातायात में बाधा पड़ती है। इसके विपरीत इस पश्चिमी किनारे पर पर्वत नहीं है। बल्कि कई द्वीप, खाड़ियाँ, प्रायद्वीप तथा डेल्टा हैं। पश्चिमी किनारे पर जापान, फिलिपींस, हिंदेशिया आदि के लगभग 7,000 द्वीप हैं। इस किनारे पर विश्व की बड़ी बड़ी नदियाँ इसमें गिरती हैं, जिनके डेल्टाओं में घनी जनसंख्या बसी है तथा अच्छे अच्छे बंदरगाह हैं। प्रशांत महासागर की आकृति त्रिभुजकार है। इसका शीर्ष बेरिंग जलडमरूमध्य पर है, जो घोड़े के खुर की आकृति का है और ज्वालामुखी पर्वतों तथा छोटी छोटी पहाड़ियों से घिरा हुआ बेसिन बनाता है। अमरीका का पश्चिमी तट प्यूजेट साउंड (Puget Sound) से अलास्का तक बर्फीली चट्टानों से युक्त है। उत्तर की ओर अल्यूशैन द्वीप का वृत्तखंड है, जो साइबेरिया के समीपवर्ती भागों से होता हुआ बेरिंग सागर तक चला गया है। मुख्य द्वीप प्रशांत महासागर के पश्चिमी किनारे से होकर कैमचैटका प्रायद्वीप के उत्तर और आस्ट्रेलिया के उत्तर-पूर्व की ओर फैले हुए हैं। ये हिंदेशिया के वृत्तखंड से जुड़ जाते हैं। भूविज्ञानियो ने इस बात का पता लगाना चाहा कि इस महासागर का निर्माण प्रारंभ में कैसे हुआ, लेकिन वे कोई भी सर्वमान्य सिद्धांत न निकाल पाए। ज्वार भाटा यहाँ की मुख्य विशेषता है। यह नौकाओं की यात्रा को प्रभावित करता है। इसका क्रम इस महासागर के विभिन्न तटों पर एक सा नहीं है। इसका प्रभाव और ऊचाई कहीं अधिक और कहीं बहुत कम होती है, जैसे कोरिया के तट पर इस"
arabic_text = "المحي الغرقه أهمها مضيق باس في أحيما يسمى بعمفي بعض العمليات الكيميائية كصدأ الحديد وتصنيع الخل من عصير التفاح. وتحتاج معظم أنواع الوقود الأكسجين لكي تحترق. وتقوم بعض أنواع البكتيريا في التربة بتحويل النيتروجين في الجو إلى أسمدة كيميائية للنبات. ويساعد ثاني أكسيد الكربون وبخار الماء على بقاء الأرض دافئة، حيث يمنعان جزءًا من حرارة سطح الأرض التي تكتسبها من أشعة الشمس من التسرب إلى الفضاء الخارجي. ويُعرف هذا السلوك من قبل الغازات بتأثير البيت المحمي. ويلزم وجود بخار الماء في الجو لتشكيل الأمطار والثلوج. والأوزون شكل من أشكال الأكسجين، يمتص جزءًا كبيرًا من الأشعة الشمسية فوق البنفسجية غير المرئية الضارة. الرطوبة الجوية. وهي على شكل ذرات من بخار الماء. ويدخل البخار إلى الغلاف الجوي عندما يتبخر الماء من المحيطات والبحيرات والأنهار، ومن التربة الرطبة ومن النباتات. ومع ارتفاع كمية بخار الماء في الهواء تزيد الرطوبة التي تعتمد على درجة الحرارة وعلى موقع المكان. فالهواء الملامس للمسطحات المائية ترتفع فيه الرطوبة، بينما تنخفض في الصحراء ويكون الهواء جافًا. والهواء الدافئ يمكن أن يحمل كمية من البخار أكثر من الهواء البارد. لذلك، تتباين الرطوبة مع اختلاف الطقس، فيكون الهواء أقل رطوبة في الأيام الصافية منه في الأيام الغائمة. وعندما يبرد الهواء لدرجة كافية، يتحول البخار إلى قطرات من الماء أو إلى بلورات ثلجية. وتسمى هذه العملية بالتكاثف. وتسمى درجة الحرارة التي يبدأ بخار الماء عندها بالتكاثف نقطة الندى. وعندما تظهر حبيبات الماء على سطح كأس الماء البارد، يكون الهواء الملامس للكأس قد برد إلى درجة أقل من نقطة الندى. وعند نقطة الندى، تكون الرطوبة الن. والرطوبة النسبية هي كمية بخار الماء الحقيقية الموجودة في الهواء عند درجة حرارة معينة، منسوبة إلى كمية بخار الماء التي يمكن أن يحملها ذلك الهواء عند درجة التشبع في نفس درجة الحـرارة. وعندما تصل الرطوبة النسون الهواء قد وصل إلى الحد الأقصى لتحمله لبخار الماء. وفي بعض الحالات قد تهطل الأمطار دون أن تصل الرطوبة النسبية إلى 100% قرب سطح الأرض، ولكنها قد تزيد عن ذلك في السحب. وكلما ارتفع الهواء قلت درجة حرارته. ولذا، فإن السحب تتكون عندما تبرد كتلة ضخمة من الهواء الرطب بسبب ارتفاعها إلى أعلى، فتنخفض درجة الحرارة إلى ما دون نقطة الندى. وتحتوي السحب على هواء مملوء بكميات هائلة من قطرات الماء أو بلورات الثلج. وتسقط الأمطار أو الجليد عندما تصبح قطرات الماء أو بلورات الثلج من الثقل بحيث تسقط خارج السحب. والضباب سحب قريبة من سطح الأرض. الجسيمات في الهواء. يحتوي الهواء على العديد من الجسيمات الصلبة المتناهية الصغر والمسماة الهباء الجوي. ويصل قطر روميتر. لذلك فهي غير مرئية، إلا عندما تتجمع بكميات ضخمة. ويأتي العديد من جسيمات الهباء الجوي إلى الهواء من البراكين النشطة، ومن عوادم السيارات والغابات والحرائق ودخان المصانع.كما تثير الرياح جسيمات الرمل والغبار من سطح الأرض إلى الهواء. وأيضًا تضم جسيمات الهباء الجوي العالقة في الهواء حبوب لقاح الأشجار وأملاح البحار والجسيمات النيزكية وكائنات حية متناهية الصغر تسمى الميكروبات. ومع مرور الوقت تستمر إضافة جسيمات الهباء الجوي إلى الغلاف الجوي، إلا أنها لا تبقى عالقة في الهواء إلى الأبد. إذ تتولى الأمطار والجليد إزالتها من الهواء، حيث يصبح الهواء منعشًا بعد تساقط الأمطار والثلوج. أما الجزء الآخر من الهباء الجوي فيسقط تدريجيًا على سطح الأرض. تتفاوت كمية جسيمات الهباء الجوي في الهواء قرب الأرض من مكان إلى آخر، حيث يحتوي المتر المكعب من الهواء فوق المحيطات على مليار جسيم، بينما يضم المتر المكعب من الهواء فوق المدن ار جسيم. ونظرًا لقلة الهباء الجوي في طبقات الجو العليا فإن الهواء عادة ما يكون أكثر نقاء."

Note.create!(author: wen, language: spanish, title: spanish_text[0001..0015], body: spanish_text[0016..0500])
Note.create!(author: wen, language: spanish, title: spanish_text[0501..0515], body: spanish_text[0516..1000])
Note.create!(author: wen, language: arabic, title: arabic_text[0001..0015], body: arabic_text[0016..0500])

Note.create!(author: paz, language: english, title: english_text[0001..0015], body: english_text[0016..0500])
Note.create!(author: paz, language: english, title: english_text[0501..0515], body: english_text[0516..1000])

Note.create!(author: kim, language: arabic, title: arabic_text[0501..0515], body: arabic_text[0516..1000])
Note.create!(author: kim, language: arabic, title: arabic_text[1001..1015], body: arabic_text[1016..1500])
Note.create!(author: kim, language: mandarin, title: mandarin_text[0001..0015], body: mandarin_text[0016..0500])

Note.create!(author: yas, language: mandarin, title: mandarin_text[0501..0515], body: mandarin_text[0516..1000])
Note.create!(author: yas, language: mandarin, title: mandarin_text[1001..1015], body: mandarin_text[1016..1500])
Note.create!(author: yas, language: hindi, title: hindi_text[0001..0015], body: hindi_text[0016..0500])
Note.create!(author: yas, language: english, title: english_text[1001..1015], body: english_text[1016..1500])

Note.create!(author: bao, language: arabic, title: arabic_text[1501..1515], body: arabic_text[1516..2000])
Note.create!(author: cid, language: mandarin, title: mandarin_text[1501..1515], body: mandarin_text[1516..2000])
Note.create!(author: gus, language: spanish, title: spanish_text[1001..1015], body: spanish_text[1016..1500])
Note.create!(author: ali, language: english, title: english_text[1501..1515], body: english_text[1516..2000])
