var hi1,hix = [];

var age_id;

var cod,codb,codt;
var causeofdeath,cod_lists,cod_count;

var hide_child,show_child,reset_child;
var chd,chd0,chd1,chd2,chd3,ch0,ch1,ch2,ch3,ch00,ch01,chkeep;

var hide_mother, show_mother,reset_mother;
var mom,mom0,mom1,mom2,mo1,mo2;

var hide_cancer,show_cancer,reset_cancer;
var cancer,cancer0,cancer1,cancer2,ca1,ca2,cay,can,cab;

var hide_cardio,show_cardio,reset_cardio;
var cardio,cardio0,cardio1,cardio2,cd1,cd2,cdy,cdn,cdb;

var hide_diabetes,show_diabetes,reset_diabetes;
var dbt,dbt0,dbt1,dbt2,dm1,dm2,dmy,dmn,dmb;

var acx,acx2,ac1_count;
var as0,as1;

var btn_informer;

$(document).ready(function(){
  // Informer button
  btn_informer = $('#btn_informer');

  btn_informer.unbind('click').bind('click', function(){
    msg = cod;
    pid13_id = $("#pid13").val();
    sex_id = $("[name='sex']").val();
    age_id = $("#age").val();
    d_date_id = $("#dead").val();
    d_cod_id = codt.text();
    cod_id = cod;

    $('#pid13_id').val(pid13_id);
    $('#sex_id').val(sex_id);
    $('#age_id').val(age_id);
    $('#d_date_id').val(d_date_id);
    $('#d_cod_id').val(d_cod_id);
    $('#cod_id').val(cod_id);
    $('#id_cod').submit();

    // Redirect to #register / #informer
    window.location.href = '/informers/new'
    return true;
  });

  // Final Cause of Death (cod)
  cod = "";
  causeofdeath = "";
  codb = $('#cod_btn');
  codp = $('#process_text');
  codt = $('#cod_text');

  // general child
  chd = $('#child');
  chd0 = $('#child0');
  chd1 = $('#child1');
  chd2 = $('#child2');
  chd3 = $('#child3');
  ch0 = $("input[name='ch0']");
  ch1 = $('#ch1');
  ch2 = $('#ch2');
  ch3 = $('#ch3');
  ch00 = $('#ch-0')[0];
  ch01 = $('#ch-1')[0];

  ch1_text = "";
  ch2_text = "";

  show_child = function(){
    reset_child();
    chd3.hide();
    chd2.hide();
    chd1.hide();
    chd0.show();
    chd.show();
  }

  hide_child = function(){
    reset_child();
    chd3.hide();
    chd2.hide();
    chd1.hide();
    chd0.show();
    chd.hide();
  }

  reset_child = function(){
    ch3[0].value = '';
    ch2.val('0').change();
    ch2.selectpicker('refresh');
    ch1.val('0').change();
    ch1.selectpicker('refresh');
    $("input[name='ch0']").attr('checked', false);
  }

  codb.unbind('click').bind('click', function(){
    var choice = $("input[name='codx']:checked").val();
    codt.text(choice);
    codt.show();
    $('#myModal').modal('hide');
    submit.hide();
    //// ERROR!!! codt.text('');
    return false;
  });

  ch0.unbind('change').bind('change', function(){
    if (ch00.checked){
      chd1.hide();
      chd2.hide();
      cancer.show();
    } else if (ch01.checked){
      chd1.show();
      chd2.show();
      cancer.hide();
    }
    return false;
  });

  ch1.unbind('change').bind('change', function(){
    ch1_text = "มารดาตั้งครรภ์ " + $('#ch1 option:selected').text();
    causeofdeath = ch1_text;
  });

  ch2.unbind('change').bind('change', function(){
    ch2x = ch2.val();
    ch2_text = " สาเหตุหลัก " + $('#ch2 option:selected').data('subtext');
    causeofdeath += ch2_text;
    cod = causeofdeath + '|';
    if (ch2x == null){
      chd1.hide();
      chd2.hide();
      submit.hide();
      //codt.text('');
    } else if (ch2x.length > 0){
      // check if user choose 00 after other choice
      if (ch2x.indexOf('00') > -1 && ch2x.length > 1) {
        ch2.attr('val','00');
        ch2.selectpicker('refresh');
      }
      if (ch2x.indexOf('12') > -1 || ch2x.indexOf('13') > -1){
        chd3.show();
        if (ch2x.indexOf('12') > -1 && ch2x.indexOf('13') > -1){
          chkeep = (chkeep == '12') ? '13' : '12';
          selectpicker_keep(ch2,chkeep);
        } else {
          ch2_text = " สาเหตุหลัก " + $('#ch2 option:selected').data('subtext');
        }
        chkeep = ch2x[ch2x.length-1];
        update_chd3_placeholder();
        submit.hide();
        //codt.text('');
      } else {
        chd3.hide();
        submit.show();
        codt.html('');
        //codt.text('');
      }
    } else {
      chd3.hide();
      submit.hide();
      //codt.text('');
    }
    return false;
  });

  // Enter a character in text field show show Submit button
  ch3.unbind('input').bind('input', function(){
    if (ch3[0].value.length == 0){
      submit.hide();
      return false;
    }
  });

  ch3.unbind('blur').bind('blur', function (e) {
    // replace ch2_text:ระบุ ... with ''
    ch2_text = ch2_text.replace(/ระบุ .../,"");
    causeofdeath = ch1_text + ':' + ch2_text + ':' + ch3.val();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    submit.show();
    codt.html('');
  });

  function update_chd3_placeholder(){
    if (chkeep == '12'){
      ch3[0].placeholder = "ระบุลักษณะความพิการ"; // SUCCESS
    } else {
      ch3[0].placeholder = "ระบุโดยแพทย์แผนปัจจุบัน"; // SUCCESS
    }
  }

  function selectpicker_keep(sel, keep){
    var opt = sel.val();
    var del = (keep == '12') ? '13' : '12';
    var x = opt.indexOf(del);
    opt.splice(x,1);
    sel.selectpicker('val',opt);
    sel.selectpicker('refresh');
  }

  // END general child

  // general mother
  mom = $('#mother');
  mom0 = $('#mother0');
  mom1 = $('#mother1');
  mom2 = $('#mother2');
  mo0 = $('#mo0');
  mo1 = $('#mo1');
  mo2 = $('#mo2');

  mo1_text = '';
  mo2_text = '';

  show_mother = function(){
    reset_mother();
    mom2.hide();
    mom1.hide();
    mom0.show();
    mom.show();
  }

  hide_mother = function(){
    reset_mother();
    mom2.hide();
    mom1.hide();
    mom0.show();
    mom.hide();
  }

  reset_mother = function(){
    mo2.value = '';
    mo1.val('0').change();
    mo1.selectpicker('refresh');
    mo0.val('0').change();
    mo0.selectpicker('refresh');
  }

  mo0.unbind('change').bind('change', function(){
    var mo0x = $('#mo0 option:selected').val();
    if (mo0x == '0'){
      mom2.hide();
      mom1.hide();
      hide_cancer();
    } else if (mo0x == '1'){
      mo2[0].value = '';
      mom2.hide();
      mo1.val('0').change();
      mo1.selectpicker('refresh');
      mom1.show();
      cancer.hide();
    } else if (mo0x > '1'){
      mom2.hide();
      mo1.val('0').change();
      mo1.selectpicker('refresh');
      mom1.hide();
      show_cancer();
    } else {
      mom1.hide();
      if (err == ""){
        // check if natural or unnatural
        if (nat.is(":visible")){
          show_cancer();
        } else {
          unnat0.show();
        }
      }
    }
    submit.hide();
    return false;
  });

  mo1.unbind('change').bind('change', function(){
    mo1_text = $('#mo1 option:selected').data('subtext');
    if (mo1_text){
      causeofdeath = mo1_text;
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,""); 
      cod = causeofdeath + "|";
    }
    var mo1x = $('#mo1 option:selected').val();
    if (mo1x == '6'){
      mom2.show();
      submit.hide();
    } else if (mo1x == '0'){
      mo2[0].value = '';
      mom2.hide();
      submit.hide();
    } else {
      mom2.hide();
      submit.show();
    }
    codt.html('');
    return false;
  });

  // Enter a character in text field show show Submit button
  mo2.unbind('input').bind('input', function(){
    if (mo2.val().length == 0){
      submit.hide();
    } else {
      mo2_text = mo2.val();
      causeofdeath  = mo2_text;
      cod = causeofdeath + '|';
      submit.show();
      codt.html('');
    }
    return false;
  });

  // END general mother

  // natural org1: cancer
  cancer = $('#cancer');
  cancer0 = $('#cancer0');
  cancer1 = $('#cancer1');
  cancer2 = $('#cancer2');
  ca1 = $('#ca1');
  ca2 = $('#ca2');
  cay = $('#org1-yes');
  can = $('#org1-no');
  cab = $('#org1');

  show_cancer = function(){
    reset_cancer();
    cancer2.hide();
    cancer1.hide();
    cancer0.show();
    cancer.show();
  }

  hide_cancer = function(){
    reset_cancer();
    cancer2.hide();
    cancer1.hide();
    cancer.hide();
  }

  reset_cancer = function(){
    ca2[0].value = '';
    ca1.val('0').change();
    ca1.selectpicker('refresh');
  }

  ca1.unbind('change').bind('change', function(){
    var cax = ca1.val();

    ////////////////////////////////
    var id = "#ca-" + cax;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (cax > '0'){
      if (cax == '18'){
        cancer2.show();
        submit.hide();
      } else {
        cancer2.hide();
        submit.show();
        codt.html('');
      }
    } else {
      ca2[0].value = '';
      cancer2.hide();
      submit.hide();
    }
    codt.text('');
    return false;
  });

  ca2.unbind('input').bind('input', function(){
    if (ca2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "มะเร็งอวัยวะอื่นๆ ";
      causeofdeath += " " + ca2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  // natural > cancer
  cay.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org1 class, add active class
    $('.org1').show();
    cab.addClass('active');

    // show cancer list
    options_by_sex();
    cancer1.show();
    return false;
  });

  can.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    cab.removeClass('active');

    // show org1,org2 => org1 org3
    $('.org1').show();
    $('.org3').show();
    return false;
  });
  // END natural org1:cancer

  // natural org2: cardio
  cardio = $('#cardio');
  cardio0 = $('#cardio0');
  cardio1 = $('#cardio1');
  cardio2 = $('#cardio2');
  cd1 = $('#cd1');
  cd2 = $('#cd2');
  cdy = $('#org2-yes');
  cdn = $('#org2-no');
  cdb = $('#org2');

  show_cardio = function(){
    reset_cardio();
    cardio2.hide();
    cardio1.hide();
    cardio0.show();
    cardio.show();
  }

  hide_cardio = function(){
    reset_cardio();
    cardio2.hide();
    cardio1.hide();
    cardio0.show();
    cardio.hide();
  }

  reset_cardio = function(){
    cd2[0].value = '';
    cd1.val('0').change();
    cd1.selectpicker('refresh');
  }

  cd1.unbind('change').bind('change', function(){
    var cdx = cd1.val();

    ////////////////////////////////
    var id = "#cd-" + cdx;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    if (id == "#cd-8") {
      cod = cd2.val();
    }
    ////////////////////////////////

    if (cdx > '0'){
      if (cdx == '8'){
        cardio2.show();
        submit.hide();
      } else {
        cardio2.hide();
        submit.show();
        codt.html('');
      }
    } else {
      cd2[0].value = '';
      cardio2.hide();
      submit.hide();
    }
    codt.text('');
    return false;
  });

  cd2.unbind('input').bind('input', function(){
    if (cd2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "โรคหัวใจอื่นๆ ";
      causeofdeath += " " + cd2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  cdy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org2 class, add active class
    $('.org2').show();
    cdb.addClass('active');

    cardio1.show();
    return false;
  });

  cdn.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    cdb.removeClass('active');

    // show org1,org2,org3 => org1 org3 org8 org9 org2 + org4
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    return false;
  });
  // END natural org2:cardio

  // natural org3: dm
  dbt = $('#diabetes');
  dbt0 = $('#diabetes0');
  dbt1 = $('#diabetes1');
  dbt2 = $('#diabetes2');
  dm1 = $('#dm1');
  dm2 = $('#dm2');
  dmy = $('#org3-yes');
  dmn = $('#org3-no');
  dmb = $('#org3');

  show_diabetes = function(){
    reset_diabetes();
    dbt2.hide();
    dbt1.hide();
    dbt0.show();
    dbt.show();
  }

  hide_diabetes = function(){
    reset_diabetes();
    dbt2.hide();
    dbt1.hide();
    dbt0.show();
    dbt.hide();
  }

  reset_diabetes = function(){
    dm2[0].value = '';
    dm1.val('0').change();
    dm1.selectpicker('refresh');
  }

  dm1.unbind('change').bind('change', function(){
    var dmx = dm1.val();

    ////////////////////////////////
    var id = "#dm-" + dmx;
    causeofdeath = "โรคเบาหวานและ" + $(id).text();
    if (id === "#dm-3") {
      causeofdeath = "โรคเบาหวานและ" + dm2.val();
    }
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (dmx > '0'){
      if (dmx == '3'){
        dbt2.show();
        submit.hide();
      } else {
        dbt2.hide();
        submit.show();
        codt.html('');
      }
    } else {
      dm2[0].value = '';
      dbt2.hide();
      submit.hide();
    }
    codt.text('');
    return false;
  });

  dm2.unbind('input').bind('input', function(){
    if (dm2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "โรคเบาหวานและ " + dm2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  dmy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org2 class, add active class
    $('.org3').show();
    dmb.addClass('active');

    dbt1.show();
    return false;
  });

  dmn.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    dmb.removeClass('active');

    // show org1,org2,org3 => org1 org3 org8
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    return false;
  });
  // END natural org3:diabetes

  // natural org4: lung
  lung = $('#lung');
  lung0 = $('#lung0');
  lung1 = $('#lung1');
  lu1 = $('#lu1');
  luy = $('#org4-yes');
  lun = $('#org4-no');
  lub = $('#org4');

  show_lung = function(){
    reset_lung();
    lung1.hide();
    lung0.show();
    lung.show();
  }

  hide_lung = function(){
    reset_lung();
    lung1.hide();
    lung0.show();
    lung.hide();
  }

  reset_lung = function(){
    lu1.val('0').change();
    lu1.selectpicker('refresh');
  }

  lu1.unbind('change').bind('change', function(){
    var lux = lu1.val();

    ////////////////////////////////
    var id = "#lu-" + lux;
    causeofdeath = $(id).text();
    // remove string in ()
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (lux > '0'){
      submit.show();
      codt.html('');
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  luy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org4 class, add active class
    $('.org4').show();
    lub.addClass('active');

    lung1.show();
    return false;
  });

  lun.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    lub.removeClass('active');

    // show org1,org2,org3,org4,org5 => org1 org3 org8 org9 org2 org4 + org6
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    $('.org6').show();
    return false;
  });
  // END natural org4:lung

  // natural org5: liver
  liver = $('#liver');
  liver0 = $('#liver0');
  liver1 = $('#liver1');
  li1 = $('#li1');
  liy = $('#org5-yes');
  lin = $('#org5-no');
  lib = $('#org5');

  show_liver = function(){
    reset_liver();
    liver1.hide();
    liver0.show();
    liver.show();
  }

  hide_liver = function(){
    reset_liver();
    liver1.hide();
    liver0.show();
    liver.hide();
  }

  reset_liver = function(){
    li1.val('0').change();
    li1.selectpicker('refresh');
  }

  li1.unbind('change').bind('change', function(){
    var lix = li1.val();

    ////////////////////////////////
    var id = "#li-" + lix;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (lix > '0'){
      submit.show();
      codt.html('');
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  liy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org5 class, add active class
    $('.org5').show();
    lib.addClass('active');

    liver1.show();
    return false;
  });

  lin.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    lib.removeClass('active');

    // show org1,org2,org3,org4,org5,org6 => org1 org3 org8 org9 org2 org4 org6 org5 + org7
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    $('.org6').show();
    $('.org5').show();
    $('.org7').show();
    return false;
  });
  // END natural org5:liver

  // natural org6: kidney
  kidney = $('#kidney');
  kidney0 = $('#kidney0');
  kidney1 = $('#kidney1');
  ki1 = $('#ki1');
  kiy = $('#org6-yes');
  kin = $('#org6-no');
  kib = $('#org6');

  show_kidney = function(){
    reset_kidney();
    kidney1.hide();
    kidney0.show();
    kidney.show();
  }

  hide_kidney = function(){
    reset_kidney();
    kidney1.hide();
    kidney0.show();
    kidney.hide();
  }

  reset_kidney = function(){
    ki1.val('0').change();
    ki1.selectpicker('refresh');
  }

  ki1.unbind('change').bind('change', function(){
    var kix = ki1.val();

    ////////////////////////////////
    var id = "#ki-" + kix;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (kix > '0'){
      submit.show();
      codt.html('');
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  kiy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org6 class, add active class
    $('.org6').show();
    kib.addClass('active');

    kidney1.show();
    return false;
  });

  kin.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    kib.removeClass('active');

    // show org1,org2,org3,org4,org5,org6,org7 => org1 org3 org8 org9 org2 org4 org6 + org5
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    $('.org6').show();
    $('.org5').show();
    return false;
  });
  // END natural org6:kidney

  // natural org7: gitract
  git = $('#gitract');
  git0 = $('#gitract0');
  git1 = $('#gitract1');
  gi1 = $('#gi1');
  giy = $('#org7-yes');
  gin = $('#org7-no');
  gib = $('#org7');

  show_gitract = function(){
    reset_gitract();
    git1.hide();
    git0.show();
    git.show();
  }

  hide_gitract = function(){
    reset_gitract();
    git1.hide();
    git0.show();
    git.hide();
  }

  reset_gitract = function(){
    gi1.val('0').change();
    gi1.selectpicker('refresh');
  }

  gi1.unbind('change').bind('change', function(){
    var gix = gi1.val();

    ////////////////////////////////
    var id = "#gi-" + gix;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (gix > '0'){
      submit.show();
      codt.html('');
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  giy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org7 class, add active class
    $('.org7').show();
    gib.addClass('active');

    git1.show();
    return false;
  });

  gin.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    gib.removeClass('active');

    // show org1,org2,org3,org4,org5,org6,org7,org8
    // => org1 org3 org8 org9 org2 org4 org6 org5 org7 + org10
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    $('.org6').show();
    $('.org5').show();
    $('.org7').show();
    $('.org10').show();
    return false;
  });
  // END natural org7:gitract

  // natural org8: congen
  congen = $('#congen');
  congen0 = $('#congen0');
  congen1 = $('#congen1');
  congen2 = $('#congen2');
  cg1 = $('#cg1');
  cg2 = $('#cg2');
  cgy = $('#org8-yes');
  cgn = $('#org8-no');
  cgb = $('#org8');

  show_congen = function(){
    reset_congen();
    congen2.hide();
    congen1.hide();
    congen0.show();
    congen.show();
  }

  hide_congen = function(){
    reset_congen();
    congen2.hide();
    congen1.hide();
    congen0.show();
    congen.hide();
  }

  reset_congen = function(){
    cg2[0].value = '';
    cg1.val('0').change();
    cg1.selectpicker('refresh');
  }

  cg1.unbind('change').bind('change', function(){
    var cgx = cg1.val();

    ////////////////////////////////
    var id = "#cg-" + cgx;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    if (id == "#cg-4") {
      cod = cg2.val();
    }
    ////////////////////////////////

    if (cgx > '0'){
      if (cgx == '4'){
        congen2.show();
        submit.hide()
      } else {
        congen2.hide();
        submit.show();
        codt.html('');
      }
      submit.show();
      codt.html('');
    } else {
      cg2[0].value = '';
      congen2.hide();
      submit.hide();
    }
    codt.text('');
    return false;
  });

  cg2.unbind('input').bind('input', function(){
    if (cg2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "โรคพันธุกรรมอื่นๆ ";
      causeofdeath += " " + cg2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  cgy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org8 class, add active class
    $('.org8').show();
    cgb.addClass('active');

    congen1.show();
    return false;
  });

  cgn.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    cgb.removeClass('active');

    // show org1,org2,org3,org4,org5,org6,org7,org8,org9
    // => org1 org3 org8 + org9
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    return false;
  });
  // END natural org8:congen

  // natural org9: hiv
  hiv = $('#hiv');
  hiv0 = $('#hiv0');
  hiv1 = $('#hiv1');
  hi1 = $('#hi1');
  hiy = $('#org9-yes');
  hin = $('#org9-no');
  hib = $('#org9');

  show_hiv = function(){
    reset_hiv();
    hiv1.hide();
    hiv0.show();
    hiv.show();
  }

  hide_hiv = function(){
    reset_hiv();
    hiv1.hide();
    hiv0.show();
    hiv.hide();
  }

  reset_hiv = function(){
    hi1.val('0').change();
    hi1.selectpicker('refresh');
  }

  hi1.unbind('change').bind('change', function(){
    if (hi1.val() && hi1.val().length > 0){
      hix = hi1.val();
    };

    ////////////////////////////////
    // HIV has only 1 line causeofdeath
    cod = "โรคเอดส์";
    for(var i=0; i < hix.length; i++){
      var id = "#hi-" + hix[i];
      causeofdeath = $(id).text();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = cod + "และ" + causeofdeath + " ";
    }
    ////////////////////////////////

    if (hix.length > 0){
      submit.show();
      codt.html('');
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  hiy.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org9 class, add active class
    $('.org9').show();
    hib.addClass('active');

    hiv1.show();
    return false;
  });

  hin.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    hib.removeClass('active');

    // show org1,org2,org3,org4,org5,org6,org7,org8,org9,org10
    // => org1 org3 org8 org9 + org2
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    return false;
  });
  // END natural org9:hiv

  // natural org10: etc
  etc = $('#etc');
  etc0 = $('#etc0');
  etc1 = $('#etc1');
  etc2 = $('#etc2');
  et1 = $('#et1');
  et2 = $('#et2');
  ety = $('#org10-yes');
  etn = $('#org10-no');
  etb = $('#org10');

  show_etc = function(){
    reset_etc();
    etc2.hide();
    etc1.hide();
    etc0.show();
    etc.show();
  }

  hide_etc = function(){
    reset_etc();
    etc2.hide();
    etc1.hide();
    etc0.show();
    etc.hide();
  }

  reset_etc = function(){
    et2[0].value = '';
    et1.val('0').change();
    et1.selectpicker('refresh');
  }

  et1.unbind('change').bind('change', function(){
    var etx = et1.val();

    ////////////////////////////////
    var id = "#et-" + etx;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (etx > '0'){
      if (etx == '5'){
        etc2.show();
        submit.hide();
      } else {
        etc2.hide();
        submit.show();
        codt.html('');
      }
    } else {
      et2[0].value = '';
      etc2.hide();
      submit.hide();
    }
    codt.text('');
    return false;
  });

  et2.unbind('input').bind('input', function(){
    if (et2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "โรคอื่นๆ " + et2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  ety.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // show org10 class, add active class
    $('.org10').show();
    etb.addClass('active');

    etc1.show();
    return false;
  });

  etn.unbind('click').bind('click', function(){
    // hide all orgs
    hide_all_orgs();

    // reset button to inactive
    etb.removeClass('active');

    // show org1,org2,org3,org4,org5,org6,org7,org8,org9,org10 END
    // => org1 org3 org8 org9 org2 org4 org6 org5 org7 org10 END
    $('.org1').show();
    $('.org3').show();
    $('.org8').show();
    $('.org9').show();
    $('.org2').show();
    $('.org4').show();
    $('.org6').show();
    $('.org5').show();
    $('.org7').show();
    $('.org10').show();
    return false;
  });
  // END natural org10:etc

  // unnatural categories
  unnat0 = $('#unnat_category');
  acb = $('#accident_b');
  asb = $('#assault_b');
  sub = $('#suicide_b');

  acd = $('#accident');
  acd0 = $('#accident0');
  acd1 = $('#accident1');
  acd2 = $('#accident2');
  acd3 = $('#accident3');

  ac0 = $('#ac0');
  //ac1 = $('#ac1');
  ac1 = $("input[type=radio][name='ac1']");
  ac2 = $('#ac2');
  ac3 = $('#ac3');

  // remember radio ac1_text
  ac1_text = '';
  ac1_count = 0;

  acb.unbind('click').bind('click', function(){
    // toggle ass, toggle sui
    asb.toggle();
    sub.toggle();

    if (!asb.is(":visible") && (!sub.is(":visible"))){
      reset_accident();
      acd.show();
    } else {
      hide_all_unns();
      acb.show();
      asb.show();
      sub.show();
      submit.hide();
    }
  });

  // unnatural > accident
  ac0.unbind('change').bind('change', function(){
    acx = ac0.val();

    ////////////////////////////////
    var id = "#ac-" + acx;
    causeofdeath = $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    if (acx == '0'){
      //reset_accident();
      acd3.hide();
      acd2.hide();
      acd1.hide();
      submit.hide();
    } else if (acx > '0'){
      //reset_accident();
      if (acx == '1'){
        acd1.show();
        acd2.show();
        ac2[0].value = '';
        ac3[0].value = '';
        acd3.hide();
        submit.hide();
      } else if (acx == '12'){
        // OLD $("input[name='ac1']").attr('checked',false);
        ac1.attr('checked', false);
        acd1.hide();
        ac2[0].value = '';
        acd2.hide();
        acd3.show();
        submit.hide();
      } else {
        ac1.attr('checked', false);
        acd1.hide();
        ac2.val('');
        acd2.hide();
        ac3.val('');
        acd3.hide();
        submit.show();
        codt.html('');
      }
    } else {
      submit.hide();
    }
    codt.text('');
    return false;
  });

  ac1.unbind('change').bind('change', function(){
    causeofdeath = $("#ac-1").text();
    acx2 = $("input[name='ac1']:checked").val(); // "1" or "2"
    var id = "#id_ac1" + acx2;
    ac1_text = $(id).text().replace(/\s/g,'');
    causeofdeath += " " + ac1_text;
    if (ac2.val().length > 0) {
      causeofdeath += " " + ac2.val();
    }
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
  });

  ac2.unbind('input').bind('input', function(){
    if (ac2.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = $("#ac-1").text();
      causeofdeath += " " + ac1_text;
      causeofdeath += " " + ac2.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    codt.text('');
    return false;
  });

  ac3.unbind('input').bind('input', function(){
    if (ac3.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "อุบัติเหตุอื่นๆ ";
      causeofdeath += " " + ac3.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    codt.text('');
    return false;
  });

  // unnatural > assault
  ass = $('#assault');
  ass0 = $('#assault0');
  ass1 = $('#assault1');
  as0 = $('#as0');
  as1 = $('#as1');

  asb.unbind('click').bind('click', function(){
    // toggle accident button (acb), toggle sui button (sub)
    acb.toggle();
    sub.toggle();

    if (!acb.is(":visible") && (!sub.is(":visible"))){
      reset_assault();
      ass.show();
    } else {
      hide_all_unns();
      acb.show();
      asb.show();
      sub.show();
      submit.hide();
    }
    return false;
  });

  as0.unbind('change').bind('change', function(){
    asx = as0.val();

    ////////////////////////////////
    var id = "#as-" + asx;
    causeofdeath = "ถูกทำร้ายตายด้วยการ" + $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    as1[0].value = '';
    if (asx == '0'){
      ass1.hide();
      submit.hide();
    } else if (asx > '0'){
      if (asx == '9'){
        ass1.show();
        submit.hide();
      } else {
        ass1.hide();
        submit.show();
        codt.html('');
      }
    }
    codt.text('');
    return false;
  });

  as1.unbind('input').bind('input', function(){
    if (as1.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "ถูกทำร้ายตายด้วยวิธี ";
      causeofdeath += " " + as1.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  // unnatural > suicide
  sui = $('#suicide');
  sui0 = $('#suicide0');
  sui1 = $('#suicide1');
  sc0 = $('#sc0');
  sc1 = $('#sc1');

  sub.unbind('click').bind('click', function(){
    // toggle accident button (acb), toggle assault button (asb)
    acb.toggle();
    asb.toggle();

    if (!acb.is(":visible") && (!asb.is(":visible"))){
      reset_suicide();
      sui.show();
    } else {
      hide_all_unns();
      acb.show();
      asb.show();
      sub.show();
      submit.hide();
    }
    return false;
  });

  sc0.unbind('change').bind('change', function(){
    scx = sc0.val();

    ////////////////////////////////
    var id = "#sc-" + scx;
    causeofdeath = "ฆ่าตัวตายโดยวิธี" + $(id).text();
    causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
    cod = causeofdeath + "|";
    ////////////////////////////////

    sc1[0].value = '';
    if (scx == '0'){
      sui1.hide();
      submit.hide();
    } else if (scx > '0'){
      if (scx == '8'){
        sui1.show();
        submit.hide();
      } else {
        sui1.hide();
        submit.show();
        codt.html('');
      }
    }
    codt.text('');
    return false;
  });

  sc1.unbind('input').bind('input', function(){
    if (sc1.val().length == 0){
      submit.hide();
    } else {
      causeofdeath = "ฆ่าตัวตายโดยวิธี ";
      causeofdeath += " " + sc1.val();
      causeofdeath = causeofdeath.replace(/ *\([^)]*\) */g,"");
      cod = causeofdeath + "|";
      submit.show();
      codt.html('');
    }
    return false;
  });

  hide_all_orgs = function(){
    hide_cancer();
    hide_cardio();
    hide_diabetes();
    hide_lung();
    hide_liver();
    hide_kidney();
    hide_gitract();
    hide_congen();
    hide_hiv();
    hide_etc();

    //codt.text('');
    submit.hide();
  }

  function options_by_sex(){
    if (sex1.checked){
      $('.male').show();
      $('.female').hide();
    } else {
      $('.male').hide();
      $('.female').show();
    }
  }

  hide_all_unns = function(){
    hide_accident();
    hide_assault();
    hide_suicide();
  }

  function hide_accident(){
    reset_accident();
    acd3.hide();
    acd2.hide();
    acd1.hide();
    acd0.show();
    acd.hide();
  }

  function reset_accident(){
    ac3[0].value = '';
    ac2[0].value = '';
    // OLD $("input[name='ac1']").attr('checked',false);
    ac1.attr('checked',false)
    ac0.val('0').change();
    ac0.selectpicker('refresh');
  }

  function hide_assault(){
    reset_assault();
    ass1.hide();
    ass0.show();
    ass.hide();
  }

  function reset_assault(){
    as1[0].value = '';
    as0.val('0').change();
    as0.selectpicker('refresh');
  }

  function hide_suicide(){
    reset_suicide();
    sui1.hide();
    sui0.show();
    sui.hide();
  }

  function reset_suicide(){
    sc1[0].value = '';
    sc0.val('0').change();
    sc0.selectpicker('refresh');
  }

  function show_cod(){
    cod_lists = cod.split('|');
    var text = cod_lists[0];
    cod_count = cod_lists.filter(function(n) { return n != ''}).length;
    if (cod_count > 1) {
      text = '<form>';
      for(i=0;i<cod_lists.length;i++){
        if (cod_lists[i] === '') { continue; }
        text += '<div class="radio">';
        text += '  <label class="radio" for="cod">';
        text += '    <input type="radio" name="codx" value="' + cod_lists[i] + '">';
        text +=        cod_lists[i];
        text += '    </input>';
        text += '  </label>';
        text += '</div>';
      }
      text += '</form>';
      $('#process_text').html(text);
    } else {
      $('#cod_text').html(text);
    }
  }

  $("#processx").click(function(){
    // Read cod and display in cod_text with button
    show_cod();

    // Fix to skip myModal if only 1 cause of death
    if (cod_count > 1){
      $("#myModal").modal({
        backdrop: 'static',
        keyboard: false
      });
    }
    return false;
  });
});
