var age,sex,sex1,sex2,sex3,dead;
var err;
var nat,unnat;

var ch0x,ch1x;

// declare functions
var check_female_10_49;
var check_age_0_10;
var hide_all_orgs;
var hide_all_unns;

$(document).ready(function(){

  nat = $('#natural');
  unnat = $('#unnatural');
  sex1 = $('#sex-1')[0];
  sex2 = $('#sex-2')[0];
  sex3 = $('#sex-3')[0];
  age = $('#age')[0];
  dead = $('#dead');

  submit = $('#submit');

  //$("#dead").datepicker({ dateFormat: "dd-mm-yy" });
  $("#dead").datepicker({
    dateFormat: 'dd/mm/yy',
    isBuddhist: true,
    defaultDate: Date.now()
  });

  dead.unbind('change').bind('change',function(){
    var date = dead.val();
    var dd = date.split('/');
    if (dd[2] < '2500'){
      dd[2] = parseInt(dd[2]) + 543;
    }
    var th_date = dd.join('/');
    document.getElementById('dead').value = th_date;
    return false;
  });

  nat.unbind('click').bind('click', function(){
    // check if sex and age and dead_date is entered
    flag = check_age_sex();
    if (flag > ""){
      return false;
    }

    // toggle unnat
    unnat.toggle();

    // if unnat is shown then hide all down below
    if (unnat.is(":visible")){
      div_natural_hide();
    } else {
      flag1 = check_age_0_10();
      flag2 = check_female_10_49();
      if (flag1 == "yes") {
        // show child div, hide mother div
        show_child();
        hide_mother();
        hide_cancer();
      } else if (flag2 == "yes") {
        // show mother div, hide child div
        hide_child();
        show_mother();
        hide_cancer();
      } else {
        // hide mod, hide chd, show cancer
        hide_child();
        hide_mother();
        show_cancer();
      }
    }
    return false;
  });

  // END natural

  // START unnatural
  unnat.unbind('click').bind('click', function(){
    // check if sex and age and dead_date is entered
    err = check_age_sex();

    if (err > ""){
      return false;
    }

    // toggle unnat
    nat.toggle();

    // if nat is shown then hide all down below
    if (nat.is(":visible")){
      div_unnatural_hide();
      div_natural_hide();
      unnat0.hide();
    } else {
      acb.show();
      asb.show();
      sub.show();
      unnat0.show();
      submit.hide();
    }
    return false;
  });
  // END unnatural

  function check_age_0_10(){
    flag = "no";
    var agex = parseInt(age.value) || 0;
    if (age.value > "" && agex < 11){
      flag = "yes";
    }
    return flag;
  }

  function check_female_10_49(){
    var flag = "no";
    sex = $("input[name='sex']:checked").val();
    var agex = parseInt(age.value) || 0;
    //if (age.value > "" && sex = '2' && agex > 9 && agex < 50){
    if (sex == '2' && agex > 9 && agex < 50){
      flag = "yes";
    }
    return flag;
  }

  function div_natural_hide(){
    hide_child();
    hide_mother();
    hide_all_orgs();
    submit.hide();
  }

  function div_unnatural_hide(){
    hide_child();
    hide_mother();
    hide_all_unns();
    submit.hide();
    return false;
  }

  function check_age_sex(){
    var flag = ""
    var agex = parseInt(age.value) || 0;
    if (!sex1.checked && !sex2.checked && !sex3.checked){
      flag += "1";
    }
    if (age.value == ""){
      flag += "2";
    }

    if (flag > ""){
      if (flag === "12") {
        alert("กรุณาระบุเพศและอายุผู้ตาย");      
      } else if (flag === "1"){
        alert("กรุณาระบุเพศผู้ตาย");      
      } else if (flag === "2"){
        alert("กรุณาระบุอายุผู้ตาย");      
      }
    }
    return flag;
  }

});
