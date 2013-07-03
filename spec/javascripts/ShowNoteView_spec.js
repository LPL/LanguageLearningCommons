describe("ShowNoteView", function() {
	describe("insertLineBreaks", function() {
		var shortDisplayText;
		var longDisplayText;
		var showNoteView = new ShowNoteView();

		beforeEach(function() {
			shortDisplayText = "This is short.";
			longDisplayText = "This text is so long it should be split.";
		});

		afterEach(function() {
			shortDisplayText = "This is short.";
			longDisplayText = "This text is so long it should be split.";
		});

		it("doesn't split displayText shorter then 25 characters", function(){
			expect(showNoteView.insertLineBreaks(shortDisplayText)).not.toMatch(/\n/);
		});

		it("splits displayText longer then 25 characters", function(){
			expect(showNoteView.insertLineBreaks(longDisplayText)).toMatch(/\n/);
		});
	});
});