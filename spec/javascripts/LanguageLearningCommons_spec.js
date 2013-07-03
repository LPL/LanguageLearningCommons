describe("LLC", function(){
	it("is defined", function(){
		expect(LLC).toBeDefined();
	});
	it("'s basic components are defined", function(){
		expect(LLC.darken).toBeDefined();
		expect(LLC.lighten).toBeDefined();
	});
});