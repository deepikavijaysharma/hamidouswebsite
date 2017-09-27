function TooltipHelper(rootElement, helpDataAttr)
{
  this.Init(rootElement, helpDataAttr);
}

TooltipHelper.prototype.Init = function (rootElement, helpDataAttr)
{
  this._AUTO_TIMEOUT = 3000;
  this._OPEN_DELAY = 500;
  
  this._helpDataAttr = !helpDataAttr ? "data-title" : helpDataAttr;
  this._rootElement = rootElement;

  var tooltipPopup = $("<div>").uniqueId();
  tooltipPopup.css("max-width", "340px");
  tooltipPopup.appendTo(rootElement);

  this._tooltipPopupId = "#" + tooltipPopup.attr("id");
  tooltipPopup.ojPopup();

  var callbackClearTimeout = this._handleClearTimeout.bind(this);
  var callbackSetTimeout = this._handleSetTimeout.bind(this);

  tooltipPopup.ojPopup(
  {
    position : 
    {
      my : {horizontal: "start", vertical: "top"},
      offset: {x: 0, y: 10},
      at : {horizontal: "start", vertical: "end"}
    },
    initialFocus : "none", 
    autoDismiss : "focusLoss",
    modality: "modeless",
    beforeOpen : callbackSetTimeout, 
    beforeClose : callbackClearTimeout, 
    focus : callbackClearTimeout
  });

  var callbackOpen = this._callbackOpen = this._handleOpen.bind(this);
  var callbackClose = this._callbackClose = this._handleClose.bind(this);

  rootElement[0].addEventListener("mouseenter", callbackOpen, true);
  rootElement[0].addEventListener("mouseleave", callbackClose, true);
  rootElement[0].addEventListener("focus", callbackOpen, true);
};

TooltipHelper.prototype._handleOpen = function (event)
{
  var target = event.target;
  event = $.Event(event);
  var title = this._getTitle(target);

  var tooltipPopupId = this._tooltipPopupId;
  var popup = $(tooltipPopupId);

  var isOpen = !popup.ojPopup("isOpen");
  if (!title && isOpen)
  {
    popup.ojPopup("close");
  }
  else if (title)
  {
    var content = this._getContentNode(popup);
    var oldTitle = content.text();
    if (oldTitle === title)
      return;

    setTimeout(function ()
    {
      content.html(title);
      popup.ojPopup("open", target);
    },
    this._OPEN_DELAY);
  }
};

TooltipHelper.prototype._getContentNode = function (popup)
{
  var content = popup.find(".oj-popup-content").first();
  return content; 
};

TooltipHelper.prototype._handleSetTimeout = function (event)
{
  this._timeoutId = window.setTimeout(this._callbackClose, this._AUTO_TIMEOUT);
};

TooltipHelper.prototype._handleClearTimeout = function (event)
{
  var timeoutId = this._timeoutId;
  delete this._timeoutId;
  window.clearTimeout(timeoutId);
};

TooltipHelper.prototype._handleClose = function (event)
{

  var tooltipPopupId = this._tooltipPopupId;
  var popup = $(tooltipPopupId);

  var isOpen = !popup.ojPopup("isOpen");
  if (!isOpen)
  {
    popup.ojPopup("close");
    this._getContentNode(popup).html("");
  }
};

TooltipHelper.prototype._getTitle = function (node)
{
  var helpDataAttr = this._helpDataAttr;
  var i = 0;
  var MAX_PARENTS = 5;

  while ((node != null) && (i++ < MAX_PARENTS))
  {
    if (node.nodeType == 1)
    {
      var title = node.getAttribute(helpDataAttr);
      if (title && title.length > 0)
        return title;
    }
    node = node.parentNode;
  }
  return null;
};

TooltipHelper.prototype.destroy = function ()
{
  var callbackOpen = this._callbackOpen;
  delete this._callbackOpen;

  var callbackClose = this._callbackClose;
  delete this._callbackClose;

  var rootElement = this._rootElement;
  delete this._rootElement;

  rootElement[0].removeEventListener("mouseenter", callbackOpen, true);
  rootElement[0].removeEventListener("focus", callbackOpen, true);
  rootElement[0].removeEventListener("mouseleave", callbackClose, true);

  var tooltipPopupId = this._tooltipPopupId;
  delete this._tooltipPopupId;

  var popup = $(tooltipPopupId);
  popup.remove();
}; 

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
  'ojs/ojpopup'],
  function (oj, ko, $)
{
  $(function ()
  {
    var root = $("#popupWrapper");
    var tooltipHelper = new TooltipHelper(root);
  });
});
