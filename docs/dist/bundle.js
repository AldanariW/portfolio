(()=>{"use strict";var e={114:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CommandParser=void 0,t.CommandParser=class{static parseName(e){return e.slice(0,e.indexOf(" ")+1||void 0).trim()}static parseArgs(e){let t=new Map,n=0;const o=()=>n>=e.length;for(;" "!==e[n]&&!o();)n++;for(;!o();){for(;"-"!==e[n]&&!o();)n++;n++,"-"===e[n]&&n++;let i=n;for(;" "!==e[n]&&!o();)n++;if(n===i)break;let s=e.slice(i,n);for(t.set(s,void 0);" "===e[n]&&!o();)n++;if("-"!==e[n]){for(i=n;" "!==e[n]&&!o();)n++;if(n>i){let o=e.slice(i,n);t.set(s,isNaN(Number(o))?o:Number(o))}}}return t}}},825:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CommandListCli=void 0;const o=n(540);class i extends o.Cli{constructor(e){super("help","Lists all available commands",(()=>this.listCommands())),this.cliInstances=e}listCommands(){return`Command List :\n - ${this.cliInstances.map((e=>`${e.name}: ${e.desc}`)).join("\n - ")}`}}t.CommandListCli=i},821:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ContentCli=void 0,t.showPane=l,t.hidePane=c,t.setContent=d;const o=n(540);let i,s,r;$((()=>{i=$(".modal-pane"),s=$(".modal-overlay"),r=$("body")}));class a extends o.Cli{constructor(e,t,n,o){super(e,t,(()=>`Showing ${e}...`)),this.content=n,this.validator=o}execute(){d('<div id="loading-div">Loading...</div>'),l();let e="";return $.ajax({url:this.content,method:"GET",success:e=>d(e),error:()=>{c(),e=`failed to load content : ${this.content}`}}),{succes:0===e.length,errors:e}}}function l(){s.fadeIn(),r.addClass("body-fixed")}function c(){s.fadeOut(),r.removeClass("body-fixed")}function d(e){i.children().not(".close-button").remove(),i.append(e)}t.ContentCli=a},161:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RedirectCli=void 0;const o=n(540);class i extends o.Cli{constructor(e,t,n){super(e,n),this.url=t}output(){return this.args.has("help")?this.help():`Opening ${this.name}...`}execute(){const e=window.open(this.url,"_blank");return null!==e?(e.focus(),{succes:!0,errors:""}):{succes:!1,errors:"L'ouverture du lien a échoué, la nouvelle fenetre a été bloqué par l'utilisateur"}}}t.RedirectCli=i},540:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Cli=void 0;const o=n(114);t.Cli=class{constructor(e,t,n){this.name=e,this.desc=t,this.callable=n,this.args=new Map}help(){return void 0!==this.validator?this.validator.generateHelp():this.desc}output(){var e,t;return this.args.has("help")?this.help():null!==(t=null===(e=this.callable)||void 0===e?void 0:e.call(this,this.args))&&void 0!==t?t:this.name}parseArgs(e){if(this.args=o.CommandParser.parseArgs(e),this.validator){const e=this.validator.validate(this.args);return{succes:e.success,errors:e.errors,follow:!1}}return{succes:!0,errors:"",follow:!this.args.has("help")}}}},489:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isExecutable=function(e){return void 0!==e&&"execute"in e}},92:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,s){function r(e){try{l(o.next(e))}catch(e){s(e)}}function a(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,a)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(482),s=n(161),r=n(825),a=n(821),l=(n(836),"content");$((()=>o(void 0,void 0,void 0,(function*(){$("#terminal").show();const e=[new s.RedirectCli("github","https://github.com/AldanariP","Just type 'github' to open the github profile in the new tab"),new s.RedirectCli("mail","mailto:curylorafael945@gmail.com?body=Je veux vous embaucher !","Write me an email !"),new s.RedirectCli("cv",`${l}/cv.pdf`,"open and download my cv !"),new a.ContentCli("competences","Voir mes differentes compétences",`${l}/competences.html`)];e.push(new r.CommandListCli(e)),new i.ShellInterface(...e);const t=$("#command-input");$("body").on("mouseup",(()=>{setTimeout((()=>{t.trigger("focus")}),0)})),$(".modal-pane").on("click",(function(e){e.stopPropagation()})),$(".close-button, .modal-overlay").on("click",(function(e){e.target===this&&(0,a.hidePane)()})),$(document).on("keyup",(function(e){"Escape"===e.key&&(0,a.hidePane)()}))}))))},482:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ShellInterface=void 0;const o=n(489),i=n(114);t.ShellInterface=class{constructor(...e){this.$terminal=$("#terminal"),this.$output=$("#output"),this.$input=$("#command-input"),this.clis=e,this.history={commands:[],currentIndex:-1},this.initializeEventListeners()}initializeEventListeners(){this.$input.on("keydown",(e=>{switch(e.key){case"Enter":this.handleCommand(),this.$terminal.scrollTop(this.$terminal[0].scrollHeight);break;case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down")}}))}navigateHistory(e){0!==this.history.commands.length&&("up"===e?this.history.currentIndex>0&&(this.history.currentIndex--,this.$input.val(this.history.commands[this.history.currentIndex])):this.history.currentIndex<this.history.commands.length-1?(this.history.currentIndex++,this.$input.val(this.history.commands[this.history.currentIndex])):this.history.currentIndex=this.history.commands.length)}handleCommand(){const e=(e,n)=>{this.$output.append(`<span class="prompt">$</span><span>${t}</span><br><span class="${n}">${e}</span><br>`)},t=this.$input.val();if(this.$input.val(""),t.trim()){this.history.commands.push(t),this.history.currentIndex=this.history.commands.length;const n=this.clis.find((e=>i.CommandParser.parseName(t)===e.name));if(void 0===n)e(`Commmande inconnue: ${t}`,"err");else{const i=n.parseArgs(t);if(e(i.succes?n.output():i.errors,i.succes?"":"err"),i.succes&&i.follow&&(0,o.isExecutable)(n)){const t=n.execute();t.succes||e(t.errors,"err")}}}}}},836:e=>{e.exports=JSON.parse('{"bootsequence":["PMAP: PCID enabled","Aldnet Kernel Version 1.0.0: Tue Oct 11 20:56:35 PDT 2011; root:xnu-1699.22.73~1/RELEASE_X86_64","vm_page_bootstrap: 987323 free pages and 53061 wired pages","kext submap [0xffffff7f8072e000 - 0xffffff8000000000], kernel text [0xffffff8000200000 - 0xffffff800072e000]","zone leak detection enabled","standard timeslicing quantum is 10000 us","mig_table_max_displ = 72","TSC Deadline Timer supported and enabled","calling mpo_policy_init for TMSafetyNet","Security policy loaded: Safety net for Rollback (TMSafetyNet)","calling mpo_policy_init for Sandbox","Security policy loaded: Seatbelt sandbox policy (Sandbox)","calling mpo_policy_init for Quarantine","Security policy loaded: Quarantine policy (Quarantine)","Copyright (c) 1982, 1986, 1989, 1991, 1993, 2015","The Regents of the University of Adelaide. All rights reserved.","using 16384 buffer headers and 10240 cluster IO buffer headers","IOAPIC: Version 0x20 Vectors 64:87","ACPI: System State [S0 S3 S4 S5] (S3)","PFM64 0xf10000000, 0xf0000000","[ PCI configuration begin ]","AldnetIntelCPUPowerManagement: Turbo Ratios 0046","AldnetIntelCPUPowerManagement: (built 13:08:12 Jun 18 2011) initialization complete","console relocated to 0xf10000000","PCI configuration changed (bridge=16 device=4 cardbus=0)","[ PCI configuration end, bridges 12 devices 16 ]","mbinit: done [64 MB total pool size, (42/21) split]","Pthread support ABORTS when sync kernel primitives misused","com.Aldnet.AldnetFSCompressionTypeZlib kmod start","com.Aldnet.AldnetTrololoBootScreen kmod start","com.Aldnet.AldnetFSCompressionTypeZlib load succeeded","com.Aldnet.AldnetFSCompressionTypeDataless load succeeded","AldnetIntelCPUPowerManagementClient: ready","wl0: Broadcom BCM4331 802.11 Wireless Controller","5.100.98.75","FireWire (OHCI) Lucent ID 5901 built-in now active, GUID c82a14fffee4a086; max speed s800.","rooting via boot-uuid from /chosen: F5670083-AC74-33D3-8361-AC1977EE4AA2","Got boot device = IOService:/AldnetACPIPlatformExpert/PCI0@0/AldnetACPIPCI/SATA@1F,2/","AldnetIntelPchSeriesAHCI/PRT0@0/IOAHCIDevice@0/AldnetAHCIDiskDriver/SarahI@sTheBestDriverIOAHCIBlockStorageDevice/IOBlockStorageDriver/","Aldnet SSD TS128C Media/IOGUIDPartitionScheme/Customer@2","BSD root: disk0s2, major 14, minor 2","Kernel is LP64","MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4  MAC AUTH succeeded","MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4 Unsolicited  Auth","wlEvent: en1 en1 Link UP","AirPort: Link Up on en1","en1: BSSID changed to 00:60:64:1e:e9:e4","virtual bool IOHIDEventSystemUserClient::initWithTask(task*, void*, UInt32):","Client task not privileged to open IOHIDSystem for mapping memory (e00002c1)","[OSBoot1]","[OSBoot2]","[OSBoot3]","Boot Complete"],"name":["                ,,        ,,                                           ,,","      db      `7MM      `7MM                                           db","     ;MM:       MM        MM","    ,V^MM.      MM   ,M\\"\\"bMM   ,6\\"Yb.  `7MMpMMMb.   ,6\\"Yb.  `7Mb,od8 `7MM","   ,M  `MM      MM ,AP    MM  8)   MM    MM    MM  8)   MM    MM\' \\"\'   MM","   AbmmmqMA     MM 8MI    MM   ,pm9MM    MM    MM   ,pm9MM    MM       MM","  A\'     VML    MM `Mb    MM  8M   MM    MM    MM  8M   MM    MM       MM",".AMA.   .AMMA..JMML.`Wbmd\\"MML.`Moo9^Yo..JMML  JMML.`Moo9^Yo..JMML.   .JMML."]}')}},t={};!function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}(92)})();
//# sourceMappingURL=bundle.js.map