class Navigator 
{
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
  }

  //Navigates to the specified url, adds the specified urlsearchparams, and retains any params already present
  navigate(url, params, hasParams)
  {
    var destination;
    var paramCount = 0;
    for (var key of this.urlParams.keys())
    {
      if (key != "act")
      {
        this.urlParams.delete(key);
      }
      paramCount++;
    }

      if (paramCount > 0)
      {
        if (hasParams) //Need the ampersand
        {
          destination = url + '?' + this.urlParams.toString() + '&' + params;
        }
        else
        {
          destination = url + '?' + this.urlParams.toString();
        }
      }
      else
      {
        if (hasParams)
        {
          destination = url + '?' + params;
        }
        else 
        {
          destination = url;
        }
      }

    document.location.href = destination;
  }
}

nav = new Navigator();