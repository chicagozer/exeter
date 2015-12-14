fields = ["DEALER_CODE", "DEALER_NAME", "AGENT_TYPE", "SCHEMA_NAME"]

DealerPages = new Meteor.Pagination("dealer", 
	{dataMargin: 5,
    	fastRender: true,
    	perPage: 10,
    	sort: {
     	 DEALER_NAME: 1
    	},
	table: {
      	"class": "table",
      	fields: fields,
      	/* header: _.map(fields, function(f) {
        return f[0].toUpperCase() + f.slice(1);
      	}), */
	header: ["Code", "Dealer Name", "Agent", "Schema"],
      	wrapper: "table-wrapper"
    	},
	availableSettings: {filters: true}});
	
if (Meteor.isClient) {

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var searchString = $(e.target).val().trim();
    DealerPages.set({
        filters: 
{'$or' : [ 
  { 'DEALER_CODE':{'$regex':searchString} },
  { 'DEALER_NAME':{'$regex':searchString} }]
}
      });
  }, 200)
});
}
