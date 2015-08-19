﻿
function GetBusinessTypeChangeFields(AssociateId) {

    // Alert("Hi");
    $.ajax({
        type: 'POST',
        cache: false,
        url: "/Associate/GetBusinessTypeChangeFields",
        data: { id: AssociateId },
        success: function (result) {
            var varMinDate = new Date();
            $("#BusinessTypeChangeWindow").load('/Associate/BusinessTypeChange #BusinessTypeChange', function () {

                var scheduledDatePicker = $("#BusinessTypeChange .ScheduledDate").kendoDatePicker({
                    culture: "en-GB",
                    format: "dd/MM/yyyy",
                    min: varMinDate,
                    open: function (e) {
                        $(".disabledDay").parent().removeClass("k-link") //removing this class makes the day unselectable
                        $(".disable dDay").parent().removeAttr("href") //this removes the hyperlink styling
                    }
                }).data("kendoDatePicker");


                var scheduledDatePicker1 = $("#ScheduledDateVatRegistered").kendoDatePicker({
                    culture: "en-GB",
                    format: "dd/MM/yyyy",
                    month: {
                        // template for dates in month view
                        content: '# if (data.date.getDay() != 1) { #' +
                        '<div class="disabledDay">#= data.value #</div>' +
                        '# } else { #' +
                        '#= data.value #' +
                        '# } #'
                    },
                    open: function (e) {
                        $(".disabledDay").parent().removeClass("k-link") //removing this class makes the day unselectable
                        $(".disable dDay").parent().removeAttr("href") //this removes the hyperlink styling
                    }
                }).data("kendoDatePicker");

                var scheduledDatePicker2 = $("#ScheduledVATDeRegistrationDate").kendoDatePicker({
                    culture: "en-GB",
                    format: "dd/MM/yyyy",
                    month: {
                        // template for dates in month view
                        content: '# if (data.date.getDay() != 1) { #' +
                        '<div class="disabledDay">#= data.value #</div>' +
                        '# } else { #' +
                        '#= data.value #' +
                        '# } #'
                    },
                    open: function (e) {
                        $(".disabledDay").parent().removeClass("k-link") //removing this class makes the day unselectable
                        $(".disable dDay").parent().removeAttr("href") //this removes the hyperlink styling
                    }
                }).data("kendoDatePicker");

                var input = $("<input type='text' id='ScheduledBusinessTypeId' style='margin-left:15px;width:344px;' />");
                $("#BusinessTypeFieldContainer").append(input);
                $(input).kendoDropDownList({
                    animation: false,
                    dataSource: businessTypesOptions,
                    dataTextField: "Text",
                    dataValueField: "Value",
                    value: $("#BusinessTypeId").val(),
                    change: function (e) {
                        setScheduledBusinessTypeVisibility();
                    }
                });
                var origUmbrellaCompanyId = $("#UmbrellaCompanyId").val();

                var input1 = $("<input type='text' id='ScheduledUmbrellaCompanyId' />");
                $("#UmbrellaCompanyFieldContainer").append(input1);
                $(input1).kendoDropDownList({
                    animation: false,
                    dataSource: umbrellaCompanyOptions,
                    dataTextField: "Text",
                    dataValueField: "Value",
                    value: origUmbrellaCompanyId,
                    change: function (e) {

                        setScheduledBusinessTypeVisibility();
                    }
                });



                $("#ScheduledVATRegistered").prop("checked", $("#VATRegistered").prop("checked"));
                $("#ScheduledVATDeRegistrationDate").val($("#VATDeRegistrationDate").val());
                $("#ScheduledVATRegistrationNumber").val($("#VATRegistration").val());
                $("#ScheduledDateVatRegistered").val($("#DateVatRegistered").val());
                $("#ScheduledSageId").val($("#SageId").val());
                $("#ScheduledRegisteredCompanyName").val($("#RegisteredCompanyName").val());
                $("#ScheduledRegisteredCompanyAddress").val($("#RegisteredCompanyAddress").val());
                $("#ScheduledLimitedCompanyNumber").val($("#LimitedCompanyNumber").val());
                $("#ScheduledRegistedCompanyBankAcctName").val($("#RegistedCompanyBankAcctName").val());
                $("#ScheduledRegistedCompanyBankAcctSort").val($("#RegistedCompanyBankAcctSort").val());
                $("#ScheduledRegistedCompanyBankAcctNumber").val($("#RegistedCompanyBankAcctNumber").val());
                $("#ScheduledOptOutSelfBilling").prop("checked", $("OptOutSelfBilling").prop("checked"));

                $("#ScheduledOtherUmbrellaCompanyName").val($("#OtherUmbrellaCompanyName").val());
                $("#ScheduledOtherUmbrellaContactEmail").val($("#OtherUmbrellaContactEmail").val());
                $("#ScheduledOtherUmbrellaContactName").val($("#OtherUmbrellaContactName").val());


                setScheduledBusinessTypeVisibility();
                ScheduledVATRegisteredChanged();

                var window = $("#BusinessTypeChangeWindow").kendoWindow({
                    title: "BusinessType",
                    modal: true,
                    width: "40%"
                }).data("kendoWindow");

                window.center().open();
                window.title("Business Type Changes");

                var validator = $("#form_BusinessTypeChange").kendoValidator(
                    {
                        messages: {
                            // defines a message for the 'custom' validation rule
                            //  custom: "Please enter valid value for my custom rule",

                            // overrides the built-in message for the required rule
                            //   required: "This field is required.",

                            // overrides the built-in message for the email rule
                            // with a custom function that returns the actual message
                            email: function (input) {
                                return getMessage(input);
                            },

                            LtdLLpName: function (input) {

                                return getMessage(input);
                            },
                            LtdLLPAddress: function (input) {

                                return getMessage(input);
                            },
                            LtdLLPRegNum: function (input) {

                                return getMessage(input);
                            }
                            ,
                            umbcompname: function (input) {

                                return getMessage(input);
                            },
                            umbcompemail: function (input) {

                                return getMessage(input);
                            },
                            umbcompcontname: function (input) {

                                return getMessage(input);
                            }

                        },
                        rules: {


                            vatregnumb: function (input) {
                                if (input.is("[data-vatregnumb-msg]")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    if (varBusinessTypeId == 1) {
                                        var varSchVATReg = ($("#ScheduledVATRegistered").prop("checked") ? 1 : 0);
                                        if (varSchVATReg == 1) {

                                            return ($("#ScheduledVATRegistrationNumber").val() != "")
                                        }
                                        else {

                                            return true;
                                        }
                                    }
                                }

                                return true;
                            },

                            LtdLLpName: function (input) {
                                if (input.is("[data-LLPName-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    if (varBusinessTypeId == 1) {
                                        return ($("#ScheduledRegisteredCompanyName").val() != "")
                                    }
                                    else {
                                        return true;
                                    }
                                }
                                return true;

                            },
                            LtdLLPAddress: function (input) {
                                if (input.is("[data-LLPAddress-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    if (varBusinessTypeId == 1) {
                                        return ($("#ScheduledRegisteredCompanyAddress").val() != "")
                                    }
                                    else { return true; }
                                }
                                return true;
                            },
                            LtdLLPRegNum: function (input) {
                                if (input.is("[data-LLPRegNum-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    if (varBusinessTypeId == 1) {
                                        return ($("#ScheduledLimitedCompanyNumber").val() != "")
                                    }
                                    else { return true; }
                                }
                                return true;
                            },
                            umbcompname: function (input) {
                                if (input.is("[data-umbcompname-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    var varUmbrellaCompnayId = $("#ScheduledUmbrellaCompanyId").val();
                                    if (varBusinessTypeId == 3 && varUmbrellaCompnayId == 1) {
                                        return ($("#ScheduledOtherUmbrellaCompanyName").val() != "")
                                    }
                                    else {
                                        return true;
                                    }
                                }
                                return true;

                            },
                            umbcompemail: function (input) {
                                if (input.is("[data-umbcompemail-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    var varUmbrellaCompnayId = $("#ScheduledUmbrellaCompanyId").val();
                                    if (varBusinessTypeId == 3 && varUmbrellaCompnayId == 1) {
                                        return ($("#ScheduledOtherUmbrellaContactEmail").val() != "")
                                    }
                                    else { return true; }
                                }
                                return true;
                            },
                            umbcompcontname: function (input) {
                                if (input.is("[data-umbcompcontname-msg")) {
                                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                                    var varUmbrellaCompnayId = $("#ScheduledUmbrellaCompanyId").val();
                                    if (varBusinessTypeId == 3 && varUmbrellaCompnayId == 1) {
                                        return ($("#ScheduledOtherUmbrellaContactName").val() != "")
                                    }
                                    else { return true; }
                                }
                                return true;
                            }


                        },



                        messages: {
                            LtdLLpName: "Please Enter Ltd LLP Name",
                            LtdLLPAddress: "Please Enter Ltd LLp Address",
                            LtdLLPRegNum: "Please Enter Ltd LLP Register number",
                            //  vatderegdate:"asd,jhaksjdhkajsdhkjasd"

                        },

                        errorTemplate: "<span>#=message#</span>"

                    }).data("kendoValidator");
                function getMessage(input) {

                    return input.data("message");
                }

                var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                if (varBusinessTypeId == 1) {
                    $("#ScheduledVATRegistrationNumber").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#status").html("Digits Only").show().css('color', 'red');
                            return false;
                        }
                    });
                    $("#ScheduledVATRegistrationNumber").blur(function () {
                        var val = $("#ScheduledVATRegistrationNumber").kendoValidator().data("kendoValidator");
                        var val1 = $("#ScheduledVATRegistrationNumber").val();
                        // alert(val1);
                        if (val.validate()) {
                            if (val1 > 0) {
                                $("#status").text("");
                                return true;
                            }
                            else {
                                $("#status").text("Please Enter Numeric Value").css('color', 'red');
                                return false;
                            }



                        }
                        else {
                            return false;

                        }
                    });
                    $("#ScheduledLimitedCompanyNumber").keypress(function (e) {
                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            $("#LLPStatus").html("Digits Only").show().css('color', 'red');
                            return false;
                        }
                    });
                    $("#ScheduledLimitedCompanyNumber").blur(function () {
                        var val = $("#ScheduledLimitedCompanyNumber").kendoValidator().data("kendoValidator");
                        var val1 = $("#ScheduledLimitedCompanyNumber").val();
                        // alert(val1);
                        if (val.validate()) {
                            if (val1 > 0) {
                                $("#LLPStatus").text("");
                                return true;
                            }
                            else {
                                $("#LLPStatus").text("Please Enter Numeric Value").css('color', 'red');
                                return false;
                            }



                        }
                        else {
                            return false;

                        }
                    });
                    $("#ScheduledDateVatRegistered").blur(function () {
                        var vatRegister = $("#ScheduledDateVatRegistered").kendoValidator().data("kendoValidator");
                        var varRegisterVal = $("#ScheduledDateVatRegistered").val();
                        if (vatRegister.validate()) {
                            if (varRegisterVal != "") {
                                $("#dateStatus").text("");
                                return true;
                            }
                            else {
                                $("#dateStatus").text("Please Choose Scheduled Date Vat Registered").css('color', 'red');
                                return false;
                            }



                        }
                        else {
                            return false;

                        }
                    });
                    $("#ScheduledVATDeRegistrationDate").blur(function () {
                        var vatDRegister = $("#ScheduledVATDeRegistrationDate").kendoValidator().data("kendoValidator");
                        var varDRegisterVal = $("#ScheduledVATDeRegistrationDate").val();
                        if (vatDRegister.validate()) {
                            if (varDRegisterVal != "") {
                                $("#dateDstatus").text("");
                                return true;
                            }
                            else {
                                $("#dateDstatus").text("Please Choose Scheduled Date Vat Registered").css('color', 'red');
                                return false;
                            }



                        }
                        else {
                            return false;

                        }
                    });

                   




                }




                //bind events
                $("#btnCreateScheduledChange").click(function () {

                    var varBusinessTypeId = $("#ScheduledBusinessTypeId").val();
                    if (varBusinessTypeId == 1) {
                        var varSchVATReg = ($("#ScheduledVATRegistered").prop("checked") ? 1 : 0);
                        if (varSchVATReg == 0) {

                            var vatDRegisterC = $("#ScheduledVATDeRegistrationDate").kendoValidator().data("kendoValidator");
                            var varDRegisterValC = $("#ScheduledVATDeRegistrationDate").val();
                            // alert(val1111);
                            if (vatDRegisterC.validate()) {
                                if (varDRegisterValC != "") {
                                    $("#dateDstatus").text("");
                                    return true;
                                }
                                else {
                                    $("#dateDstatus").text("Please Choose Scheduled Date VatDE Registered").css('color', 'red');
                                    return false;
                                }
                            }
                            else {
                                return false;

                            }
                        }

                        else {

                            var vatRegisterC = $("#ScheduledDateVatRegistered").kendoValidator().data("kendoValidator");
                            var varRegisterValC = $("#ScheduledDateVatRegistered").val();
                            if (vatRegisterC.validate()) {
                                if (varRegisterValC != "") {
                                    $("#dateStatus").text("");
                                    return true;
                                }
                                else {
                                    $("#dateStatus").text("Please Choose Scheduled Date Vat Registered").css('color', 'red');
                                    return false;
                                }



                            }
                            else {
                                return false;

                            }
                        }

                    }


                 
                          
                       



                    var isValid = validator.validate();

                    if (isValid == false) {
                        return false;
                    }

                    var isValid = true;
                    var scheduledDate = "";
                    var varVATdeRegisteredDate = "";
                    var varVATRegDate = "";
                    try {
                        var dt = scheduledDatePicker.value();
                        scheduledDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
                    }
                    catch (e) {
                        isValid = false;
                    }

                    try {
                        var dt2 = $("#ScheduledVATDeRegistrationDate").val();
                        varVATdeRegisteredDate = dt2.getDate() + "/" + (dt2.getMonth() + 1) + "/" + dt2.getFullYear();
                    }
                    catch (e) {
                        // isValid = false;
                    }

                    try {
                        var dt1 = $("#ScheduledDateVatRegistered").val();
                        varVATRegDate = dt1.getDate() + "/" + (dt1.getMonth() + 1) + "/" + dt1.getFullYear();
                    }
                    catch (e) {
                        // isValid = false;
                    }
                    var change = [
                            { "id": "ID", "value": AssociateId },
                            { "id": 'BusinessTypeId', "value": $("#ScheduledBusinessTypeId").val() },
                           { "id": 'VATRegistered', "value": ($("#ScheduledVATRegistered").prop("checked") ? 1 : 0) },
                           { "id": 'DateVatDeRegistered', "value": varVATdeRegisteredDate },
                           { "id": 'VATRegistration', "value": $("#ScheduledVATRegistrationNumber").val() },
                           { "id": 'DateVatRegistered', "value": varVATRegDate },
                           { "id": 'SageId', "value": $("#ScheduledSageId").val() },
                           { "id": 'RegisteredCompanyName', "value": $("#ScheduledRegisteredCompanyName").val() },
                           { "id": 'RegisteredCompanyAddress', "value": $("#ScheduledRegisteredCompanyAddress").val() },
                           { "id": 'LimitedCompanyNumber', "value": $("#ScheduledLimitedCompanyNumber").val() },
                           { "id": 'RegistedCompanyBankAcctName', "value": $("#ScheduledRegistedCompanyBankAcctName").val() },
                           { "id": 'RegistedCompanyBankAcctSort', "value": $("#ScheduledRegistedCompanyBankAcctSort").val() },
                           { "id": 'RegistedCompanyBankAcctNumber', "value": $("#ScheduledRegistedCompanyBankAcctNumber").val() },
                           { "id": 'OptOutSelfBilling', "value": $('input:radio[name=ScheduledOptOutSelfBilling]:checked').val() },
                           { "id": 'UmbrellaCompanyId', "value": $("#UmbrellaCompanyId").val() },
                           { "id": 'OtherUmbrellaCompanyName', "value": $("#ScheduledOtherUmbrellaCompanyName").val() },
                           { "id": 'OtherUmbrellaContactEmail', "value": $("#ScheduledOtherUmbrellaContactEmail").val() },
                            { "id": 'OtherUmbrellaContactName', "value": $("#ScheduledOtherUmbrellaContactName").val() }

                    ];

                    createTaskForAssScheduledChange(AssociateId, scheduledDate, "BusinessTypes", change);
                });

                $("#btnCreateScheduledCancel").click(function () {
                    window.close();
                    $("#ScheduledChangeWindow").html();
                });



            });


        }
    });

}

function createTaskForAssScheduledChange(associateId, scheduledDate, field, value) {

    $.ajax({
        type: "POST",
        url: "/Associate/CreateBusinessTask",
        traditional: true,
        data: {
            id: associateId,
            scheduledDate: scheduledDate,
            field: field,
            value: JSON.stringify(value)
        },
        error: function (result) {
            return false;
        },
        success: function (result) {
            alert('Associate BusinessType details successfully updated.');
            //hide dialog
            var window = $("#BusinessTypeChangeWindow").data("kendoWindow");
            window.close();
            return false;
        }
    });
}
function setScheduledBusinessTypeVisibility() {
    var businessTypeId = $('#ScheduledBusinessTypeId').val();
    var umbrellaCompanyId = $('#ScheduledUmbrellaCompanyId').val();
    var vatRegInfoRequired;
    if ((businessTypeId === "3")) {

        $("#ScheduledUmbrellaList, #ScheduledUmbrellaCompany").show();
        if (umbrellaCompanyId === "1") {
            $("#ScheduledUmbrellaOther").show();
        } else {
            $("#ScheduledUmbrellaOther").hide();
        }
    } else {
        $("#ScheduledUmbrellaOther, #ScheduledUmbrellaList, #ScheduledUmbrellaCompany").hide();
        $('#ScheduledUmbrellaCompanyId').val("");
    }

    if (businessTypeId === "1") {

        $("#ScheduledLtdCompanySection").show();

        vatRegInfoRequired = $("#VATRegistered").is(":checked") ? "True" : "False";
    } else {
        $("#ScheduledLtdCompanySection").hide();
        vatRegInfoRequired = "False";
    }

    $("#ScheduledVatRegInfoRequired").val(vatRegInfoRequired).trigger("change");
}

function ScheduledVATRegisteredChanged() {
    if ($('#ScheduledVATRegistered').is(':checked')) {
        $("#SchVatRegInfoRequired").val("True");
        $('#ScheduledVATRegistration').show();
        $('#ScheduledVATDeRegistration').hide();

    } else {
        $("#SchVatRegInfoRequired").val("False");
        $('#ScheduledVATRegistration').hide();
        $('#ScheduledVATDeRegistration').show();

    }
}


//$(function () {


//    SetBusinessSchValidation();
//});

function SetBusinessSchValidation() {

    $("form_BusinessTypeChange").kendoValidator({
        rules: {

            vatderegdate: function (input) {

                if (input.is("[data-vatderegdate-msg]") && input.val() != "") {

                    var varSchVATReg = ($("#ScheduledVATRegistered").prop("checked") ? 1 : 0);
                    if (varSchVATReg == 0) {
                        return ($("#ScheduledVATDeRegistrationDate").val() == "");
                    }
                    else { return true; }

                }

                return true;
            }
        }, errorTemplate: "<span class='field-validation-error'>#=message#</span>"
    });

}