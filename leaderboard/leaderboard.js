// <script src="https://raw.githubusercontent.com/CO2ken/demo-frontend/master/leaderboard/leaderboard.js"></script>

function showUserResults(address) {
  console.log(`Getting results for ${address}`);
  $.ajax({
    url: "https://api.thegraph.com/subgraphs/name/benesjan/co2ken",
    contentType: "application/json", type: 'POST',
    data: JSON.stringify({
      query: `{ userBalances(id: \"${address}\") { balance } }`
    }),
    success: function (result) {
      let retiredCO2kenDecimals = result['data']['userBalances'][0]['balance'];
      retiredCO2ken = retiredCO2kenDecimals / 1e18;
      console.log("Retired CO2ken:", retiredCO2kenDecimals);
      $("#total-retired-co2ken").text(retiredCO2ken);
    }
  });
}

$(document).ready(function () {
  let leaderboardPlace = "...";
  let retiredCO2ken = "...";
  let totalDaiSpent = "...";

  $("#leaderboard-place").text(leaderboardPlace);
  $("#total-retired-co2ken").text(retiredCO2ken);
  $("#total-dai-spent").text(totalDaiSpent);

  window.addEventListener('dappHeroConfigLoaded', ({ detail: dappHero }) => {
    if (dappHero.provider) {
      let userAddress = dappHero.provider.selectedAddress;
      if (userAddress) {
        $("#current-eth-address").val(userAddress);
        console.log("Currently connected user address", userAddress);
        showUserResults(userAddress);
      }
      else {
        console.warn("dappHero.provider non-null but no user address given");
      }
    }
  });

  $("#eth-address-search").click(function () {
    let address = $("#eth-address").val();
    showUserResults(address);
  });
});